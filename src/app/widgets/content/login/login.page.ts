import { UserLoginData } from 'src/app/services/authentication/authentication.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage/storage.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NetworkService } from 'src/app/services/network.service';
import { UserService } from 'src/app/services/user/user.service';
import { storageHelpers } from 'src/app/helpers/storage-helpers';
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
        username: new UntypedFormControl('UsamaParkar', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(UserHelpers.MaxLengthForUserName)])),
        password: new UntypedFormControl('UsamaParkar', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(UserHelpers.MaxLengthForPassword)])),
    });
    isLogginIn: boolean = false;

    constructor(
        private _routingService: RoutingService,
        private _networkService: NetworkService,
        private _storageService: StorageService,
        private _toastService: ToastService,
        private _userService: UserService
    ) {}

    ngOnInit() {
        this._setupLoginPage();
    }

    private async _setupLoginPage() {
        this._setVariables()
    }

    private async _setVariables() {
        if (this.isLogginIn) {
            this._showLoginLoader(false);
        }
    }

    async validateLoginForm() {
        const isLoginFormValid = await this._isLoginFormValid();
        if (!isLoginFormValid) {
            return;
        }
        

        this.onLogin();
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
        const showMessageForInvalidUserName = (message: string) => {
            this._toastService.showToast({
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
        const showMessageForInvalidPassword = (message: string) => {
            this._toastService.showToast({
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
    async onLogin(): Promise<void> {
        return await new Promise(async (resolve) => {
            try {
                this._showLoginLoader(true);
                await this._setTimeOutForDismissingLoader();
                if (this._networkService.isOnline) {
                    this._loginOnline();
                } else {
                    this._loginOffline();
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

    private _showLoginLoader(value: boolean) {
        this.isLogginIn = value;
    }

    private async _loginOnline() {
        const userLoginData= new UserLoginData({
            username: this.loginForm.get('username')?.value?.trim(),
            password: this.loginForm.get('password')?.value?.trim(),
        });

        const userExists: boolean = await this._userService.doesUserExists(userLoginData);

        if (!userExists) {
            this._showLoginLoader(false);
            this._toastService.showToast({
                id: toastHelpers.userDoesNotExist,
                message: `You do not have an account with us for the User: ${userLoginData.username}`
            });
            return;
        }

        this._showLoginLoader(false);
        await this._setLoginTokenToStorage();
        await this._routingService.goToDashboard();
    }

    private async _loginOffline() {
        await this._toastService.showNoInternetConnectionToast();
    }

    private async _setLoginTokenToStorage() {
        await this._storageService.set(storageHelpers.isUserLoggedIn, true);
    }
}
