import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService, UserSignupData } from 'src/app/services/authentication/authentication.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { SignupService } from 'src/app/services/signup/signup.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NetworkService } from 'src/app/services/network.service';
import { UserService } from 'src/app/services/user/user.service';
import { localHelpers } from 'src/app/helpers/local-helpers';
import { toastHelpers } from 'src/app/helpers/toast-helpers';
import { UserHelpers } from 'src/app/helpers/user-helpers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

    isSigningUp: boolean = false;
    signupPageFormValidators = UserHelpers;
    
    confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const doPasswordsMatch = control.value.password === control.value.confirmPassword;
        if (!doPasswordsMatch) {
            control.get('confirmPassword')?.setErrors({ passwordsDoNotMatch: true });
            return { passwordsDoNotMatch: true };
        }
        return null;
    };

    signupForm = new UntypedFormGroup({
        username: new UntypedFormControl('UsamaParkar', Validators.compose([Validators.required, Validators.minLength(UserHelpers.MinLengthForUserName), Validators.maxLength(UserHelpers.MaxLengthForUserName)])),
        password: new UntypedFormControl('UsamaParkar', Validators.compose([Validators.required, Validators.minLength(UserHelpers.MinLengthForPassword), Validators.maxLength(UserHelpers.MaxLengthForPassword)])),
        confirmPassword: new UntypedFormControl('UsamaParkar', Validators.compose([Validators.required, Validators.minLength(UserHelpers.MinLengthForPassword), Validators.maxLength(UserHelpers.MaxLengthForPassword)])),
    }, { validators: [this.confirmPasswordValidator] });

    constructor(
        private _userService: UserService,
        private _toastService: ToastService,
        private _signupService: SignupService,
        private _networkService: NetworkService,
        private _routingService: RoutingService,
        private _authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this._setupSignupPage();
    }

    private async _setupSignupPage() {
        this._setVariables()
    }

    private async _setVariables() {
        if (this.isSigningUp) {
            this._showSignupLoader(false);
        }
    }

    private _showSignupLoader(value: boolean) {
        this.isSigningUp = value;
    }


    async validateSignupForm() {
        const issignupFormValid = await this._isSignupFormValid();
        if (!issignupFormValid) {
            return;
        }

        await this._onSignup();
    }
    
    private _isSignupFormValid(): boolean {
        if (this.signupForm.invalid) {
            const isUserNameValid = this._isUserNameValid();
            if (!isUserNameValid) {
                return false;
            }

            const isPasswordValid = this._isPasswordValid();
            if (!isPasswordValid) {
                return false;
            }

            const _isConfirmPasswordValid = this._isConfirmPasswordValid();
            if (!_isConfirmPasswordValid) {
                return false;
            }
        }

        return true;
    }

    private _isUserNameValid(): boolean {
        const userNameErrors = this.signupForm.controls['username']?.errors;
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
        const passwordErrors = this.signupForm.controls['password']?.errors;
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

    private _isConfirmPasswordValid() {
        const passwordErrors = this.signupForm.controls['confirmPassword']?.errors;
        const showMessageForInvalidPassword = (message: string) => {
            this._toastService.showToast({
                id: toastHelpers.invalidForm + 'confirmPassword',
                message: message
            });
        }

        if (passwordErrors?.['required']) {
            showMessageForInvalidPassword('You have not provided a confirmation password');
            return false;
        }

        if (passwordErrors?.['passwordsDoNotMatch']) {
            showMessageForInvalidPassword('Your passwords do not match');
            return false;
        }

        return true;
    }

    private async _onSignup() {
        return await new Promise(async (resolve) => {
            try {
                this._showSignupLoader(true);
                await this._setTimeOutForDismissingLoader();
                if (this._networkService.isOnline) {
                    await this._signUpOnline();
                } else {
                    await this._showToastUserCannotSignupOffline();
                }
                resolve(true);
            } catch (error) {
                this._dimissLoadingStateIfLoading();
                resolve(false);
            }
        });
    }

    private async _showToastUserCannotSignupOffline() {
        await this._toastService.showToast({
            id: toastHelpers.cannotSignUpOffline,
            message: `You need to be online to create a new account`
        });
    }

    private async _signUpOnline() {
        const userSignupData= new UserSignupData({
            username: this.signupForm.get('username')?.value?.trim(),
            password: this.signupForm.get('password')?.value?.trim(),
            confirmPassword: this.signupForm.get('confirmPassword')?.value?.trim(),
        });

        const userExists: boolean = await this._userService.doesUserExists(userSignupData);

        if (userExists) {
            await this._showToastForUserExists(userSignupData.username);
            await this._showSignupLoader(false);
        } else {
            const userCreated = await this._signupService.createUserAccount(userSignupData);
            if (userCreated?.success) {
                await this._authenticationService.loginUser();
                await this._routingService.goToLogin();
                await this._showSignupLoader(false);
            }
        }
    }
    
    private async _showToastForUserExists(username: string) {
        await this._toastService.showToast({
            id: toastHelpers.userDoesNotExist,
            message: `An account already exists for the Username: ${username}`
        });
    }
    
    private async _setTimeOutForDismissingLoader() {
        const timeoutToEnabledLoginButton = setTimeout(() => {
            this._dimissLoadingStateIfLoading();
            clearTimeout(timeoutToEnabledLoginButton);
        }, localHelpers.timeInMiliSecondsToDismissLoader);
    }

    private _dimissLoadingStateIfLoading() {
        if (this.isSigningUp) {
            this._showSignupLoader(false);
        }
    }
}
