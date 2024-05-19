import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SecureStorageService } from 'src/app/services/secure-storage/secure-storage.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { secureStorageHelpers } from 'src/app/helpers/secure-storage-helpers';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { NetworkService } from 'src/app/services/network/network.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserLoginData } from 'src/app/models/user-login-data';
import { localHelpers } from 'src/app/helpers/local-helpers';
import { toastHelpers } from 'src/app/helpers/toast-helpers';
import { UserHelpers } from 'src/app/helpers/user-helpers';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
    loginPageFormValidators = UserHelpers;
    loginForm = new UntypedFormGroup({
        username: new UntypedFormControl('UsamaParkar', Validators.compose([
            Validators.required,
            Validators.minLength(UserHelpers.MinLengthForUserName),
            Validators.maxLength(UserHelpers.MaxLengthForUserName)
        ])),
        password: new UntypedFormControl('UsamaParkar', Validators.compose([
            Validators.required,
            Validators.minLength(UserHelpers.MinLengthForPassword),
            Validators.maxLength(UserHelpers.MaxLengthForPassword)
        ])),
    });
    isLogginIn: boolean = false;

    constructor(
        private _userService: UserService,
        private _toastService: ToastService,
        private _routingService: RoutingService,
        private _networkService: NetworkService,
        private _translateService: TranslateService,
        private _secureStorageService: SecureStorageService,
        private _authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        this._setupLoginPage();
    }

    private async _setupLoginPage() {
        this._setVariables();
    }

    private async _setVariables() {
        if (this.isLogginIn) {
            this._showLoginLoader(false);
        }
    }

    private _showLoginLoader(value: boolean) {
        this.isLogginIn = value;
    }

    goToSignup() {
        this._routingService.goToSignup();
    }

    async validateLoginForm() {
        const isLoginFormValid = await this._isLoginFormValid();
        if (!isLoginFormValid) {
            return;
        }
        
        await this._onLogin();
    }

    private _isLoginFormValid(): boolean {
        if (this.loginForm.invalid) {
            const isUserNameValid = this._isUserNameValid();
            if (!isUserNameValid) {
                return false;
            }

            const isPasswordValid = this._isPasswordValid();
            if (!isPasswordValid) {
                return false;
            }
        }

        return true;
    }

    private _isUserNameValid(): boolean {
        const userNameErrors = this.loginForm.controls['username']?.errors;
        const showMessageForInvalidUserName = async (message: string) => {
            await this._toastService.showToast({
                id: toastHelpers.invalidForm + 'username',
                message: message
            });
        }

        if (userNameErrors?.['required']) {
            showMessageForInvalidUserName(this._translateService.instant('LOGIN.NO_USERNAME'));
            return false;
        } else if (userNameErrors?.['minlength']) {
            showMessageForInvalidUserName(this._translateService.instant('LOGIN.USERNAME_TOO_SHORT', {
                userNameLength: userNameErrors?.['minlength']?.requiredLength
            }));
            return false;
        } else if (userNameErrors?.['maxlength']) {
            showMessageForInvalidUserName(this._translateService.instant('LOGIN.USERNAME_TOO_LONG', {
                userNameLength: userNameErrors?.['maxlength']?.requiredLength
            }));
            return false;
        }
    
        return true;
    }

    private _isPasswordValid() {
        const passwordErrors = this.loginForm.controls['password']?.errors;
        const showMessageForInvalidPassword = async (message: string) => {
            await this._toastService.showToast({
                id: toastHelpers.invalidForm + 'password',
                message: message
            });
        }

        if (passwordErrors?.['required']) {
            showMessageForInvalidPassword(this._translateService.instant('LOGIN.NO_PASSWORD'));
            return false;
        }

        return true;
    }

    /** @description Login is called only after the form is validated */
    private async _onLogin(): Promise<void> {
        return await new Promise(async (resolve, reject) => {
            try {
                this._showLoginLoader(true);
                await this._setTimeOutForDismissingLoader();
                if (this._networkService.isOnline) {
                    this._loginOnline();
                } else {
                    this._handleOfflineLogin();
                }
                this._showLoginLoader(true);

                resolve();
            } catch (error) {
                this._dimissLoadingStateIfLoading();
                reject(error);
            }
        });
    }

    private async _setTimeOutForDismissingLoader() {
        const timeoutToEnabledLoginButton = setTimeout(() => {
            this._dimissLoadingStateIfLoading();
            clearTimeout(timeoutToEnabledLoginButton);
        }, localHelpers.timeInMiliSecondsToDismissLoader);
    }

    private _dimissLoadingStateIfLoading() {
        if (this.isLogginIn) {
            this._showLoginLoader(false);
        }
    }

    private _handleOfflineLogin() {
        this._loginOffline();
    }

    /** @description Online Login is unavailable currently. Redirecting to offline login */
    private async _loginOnline() {
        // The below line is temporary. Remove after creating backend
        this._loginOffline();
    }

    private async _loginOffline() {
        const userLoginData= new UserLoginData({
            username: this.loginForm.get('username')?.value?.trim(),
            password: this.loginForm.get('password')?.value?.trim(),
        });

        const userExists: boolean = await this._userService.doesUserExists(userLoginData);
        if (!userExists) {
            await this._showUserDoesNotExistToast(userLoginData.username);
            await this._showLoginLoader(false);
            return;
        }
        
        const userDataOfflineLogin = await this._userService.getUserDataOffline(userLoginData.username);
        const isUserAuthenticated = await this._userService.authenticateUser(userDataOfflineLogin, userLoginData.password);
        await this._showLoginLoader(false);
        if (isUserAuthenticated) {
            const secureUserData = await this._secureStorageService.createSecureUserData(userDataOfflineLogin);
            await this._secureStorageService.set(secureStorageHelpers.userLoginData, secureUserData);
            await this._authenticationService.loginUser();
            await this._routingService.goToDashboard();
        } else {
            await this._showToastForIncorrectPasswordEntered();
        }
    }

    private async _showUserDoesNotExistToast(username: string) {
        await this._toastService.showToast({
            id: toastHelpers.userDoesNotExist,
            message: this._translateService.instant('LOGIN.USERNAME_DOES_NOT_EXIST', {
                username: username
            })
        });
    }

    private async _showToastForIncorrectPasswordEntered() {
        await this._toastService.showToast({
            id: toastHelpers.incorrectPasswordOnLogin,
            message: this._translateService.instant('LOGIN.INCORRECT_PASSWORD')
        });
    }
}
