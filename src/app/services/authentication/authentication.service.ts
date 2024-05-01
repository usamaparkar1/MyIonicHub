import { CbContractService } from 'src/app/projects/contract-booker/services/contract/cb-contract.service';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { CbRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { storageHelpers } from 'src/app/helpers/storage-helpers';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
    currentAccessToken = null;

    constructor(
        private _storageService: StorageService,
        private _appHelperService: AppHelperService,
        private _cbContractService: CbContractService,
    ) { }

    // Store a new access token
    storeAccessToken(accessToken: any) {
        this.currentAccessToken = accessToken;
        return from(this._storageService.set(storageHelpers.accessTokenKey, accessToken));
    }

    // Load the refresh token from storage
    // then attach it as the header for one specific API call
    getNewAccessToken() {
        const refreshToken = from(this._storageService.get(storageHelpers.refreshTokenKey));
        return refreshToken.pipe(
        switchMap(token => {
            if (token && token.value) {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token.value}`
                    })
                }
                // return this.http.get(`${this.url}/auth/refresh`, httpOptions);
                return of(null);
            } else {
                // No stored refresh token
                return of(null);
            }
        })
        );
    }

    async loginUser() {
        await this.setLoginTokenToStorage();
    }

    async logoutUser() {
        await this.removeLoginTokenFromStorage();
    }

    async setLoginTokenToStorage() {
        await this._storageService.set(storageHelpers.isUserLoggedIn, true);
        await this._appHelperService.setUserIsLoggedInToken();
    }

    async removeLoginTokenFromStorage() {
        await this._storageService.remove(storageHelpers.isUserLoggedIn);
        await this._appHelperService.removeUserIsLoggedInToken();
    }

    async removeCurrentAppInUseFromStorage() {
        await this._clearAppRelatedData();
        await this._storageService.remove(storageHelpers.currentAppInUse);
        await this._appHelperService.removeCurrentAppInUseToken();
    }

    private async _clearAppRelatedData() {
        if (this._appHelperService.getCurrentAppInUseToken === CbRoutingHelpers.cbHome) {
            await this._cbContractService.clearCartContractStorageKeys();
        }
    }
}


export class UserLoginData implements IUserLoginData {
    username: string;
    password: string;

    constructor(userLoginData: UserLoginData) {
    	this.username = userLoginData.username;
        this.password = userLoginData.password;
  	}
}

export interface IUserLoginData {
    username: string;
    password: string;
}

export class UserSignupData implements IUserSignupData {
    username: string;
    password: string;
    confirmPassword: string;

    constructor(userSignupData: UserSignupData) {
    	this.username = userSignupData.username;
        this.password = userSignupData.password;
        this.confirmPassword = userSignupData?.confirmPassword;
  	}
}

export interface IUserSignupData {
    username: string;
    password: string;
    confirmPassword: string;
}