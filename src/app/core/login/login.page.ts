import { AuthenticationService, UserLoginData } from 'src/app/services/authentication/authentication.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NetworkService } from 'src/app/services/network.service';
import { UserService } from 'src/app/services/user/user.service';
import { localHelpers } from 'src/app/helpers/local-helpers';
import { toastHelpers } from 'src/app/helpers/toast-helpers';
import { UserHelpers } from 'src/app/helpers/user-helpers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
    loginPageFormValidators = UserHelpers;
    loginForm = new UntypedFormGroup({
        username: new UntypedFormControl('UsamaParkar', Validators.compose([Validators.required, Validators.minLength(UserHelpers.MinLengthForUserName), Validators.maxLength(UserHelpers.MaxLengthForUserName)])),
        password: new UntypedFormControl('UsamaParkar', Validators.compose([Validators.required, Validators.minLength(UserHelpers.MinLengthForPassword), Validators.maxLength(UserHelpers.MaxLengthForPassword)])),
    });
    isLogginIn: boolean = false;

    constructor(
        private _userService: UserService,
        private _toastService: ToastService,
        private _routingService: RoutingService,
        private _networkService: NetworkService,
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
            showMessageForInvalidUserName('You have not provided a username');
            return false;
        } else if (userNameErrors?.['minlength']) {
            showMessageForInvalidUserName(`Username must be atleast ${userNameErrors?.['minlength']?.requiredLength} long`);
            return false;
        } else if (userNameErrors?.['maxlength']) {
            showMessageForInvalidUserName(`Username must be less than ${userNameErrors?.['maxlength']?.requiredLength} characters`);
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
            showMessageForInvalidPassword('You have not provided a password');
            return false;
        }

        return true;
    }

    /** @description Login is called only after the form is validated */
    private async _onLogin(): Promise<void> {
        return await new Promise(async (resolve) => {
            try {
                this._showLoginLoader(true);
                await this._setTimeOutForDismissingLoader();
                if (this._networkService.isOnline) {
                    this._loginOnline();
                } else {
                    this._handleOfflineLogin();
                }
                this._showLoginLoader(true);
            } catch (error) {
                this._dimissLoadingStateIfLoading();
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
            await this._authenticationService.loginUser();
            await this._routingService.goToDashboard();
        } else {
            await this._showToastForIncorrectPasswordEntered();
        }
    }

    private async _showUserDoesNotExistToast(username: string) {
        await this._toastService.showToast({
            id: toastHelpers.userDoesNotExist,
            message: `You do not have an account with us for the User: ${username}`
        });
    }

    private async _showToastForIncorrectPasswordEntered() {
        await this._toastService.showToast({
            id: toastHelpers.incorrectPasswordOnLogin,
            message: `You have entered an incorrect password. Please check your password again.`
        });
    }
}
