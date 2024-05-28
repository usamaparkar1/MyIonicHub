import { CbContractService } from 'src/app/projects/contract-booker/services/contract/cb-contract.service';
import { SqliteStorageService } from 'src/app/services/storage/sqlite-storage.service';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { SecureStorageService } from '../secure-storage/secure-storage.service';
import { secureStorageHelpers } from 'src/app/helpers/secure-storage-helpers';
import { CbRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { storageHelpers } from 'src/app/helpers/storage-helpers';
import { HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
    currentAccessToken = null;

    constructor(
        private _appHelperService: AppHelperService,
        private _cbContractService: CbContractService,
        private _secureStorageService: SecureStorageService,
        private _sqliteStorageService: SqliteStorageService,
    ) { }

    // Store a new access token
    storeAccessToken(accessToken: any) {
        this.currentAccessToken = accessToken;
        return from(this._sqliteStorageService.set(storageHelpers.accessTokenKey, accessToken));
    }

    // Load the refresh token from storage
    // then attach it as the header for one specific API call
    getNewAccessToken() {
        const refreshToken = from(this._sqliteStorageService.get(storageHelpers.refreshTokenKey));
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

    async saveSecureData(userDataOfflineLogin: UserModel) {
        const secureUserData = await this._secureStorageService.createSecureUserData(userDataOfflineLogin);
        await this._secureStorageService.set(secureStorageHelpers.userLoginData, secureUserData);
    }

    async loginUser() {
        await this.setLoginTokenToStorage();
    }

    async logoutUser() {
        await this.removeLoginTokenFromStorage();
    }

    async setLoginTokenToStorage() {
        await this._sqliteStorageService.set(storageHelpers.isUserLoggedIn, true);
        await this._appHelperService.setUserIsLoggedInToken();
    }

    async removeLoginTokenFromStorage() {
        await this._secureStorageService.remove(secureStorageHelpers.userLoginData);
        await this._sqliteStorageService.remove(storageHelpers.isUserLoggedIn);
        await this._appHelperService.removeUserIsLoggedInToken();
    }

    async removeCurrentAppInUseFromStorage() {
        await this._clearAppRelatedData();
        await this._sqliteStorageService.remove(storageHelpers.currentAppInUse);
        await this._appHelperService.removeCurrentAppInUseToken();
    }

    private async _clearAppRelatedData() {
        if (this._appHelperService.getCurrentAppInUseToken === CbRoutingHelpers.cbHome) {
            await this._cbContractService.clearCartContractStorageKeys();
        }
    }
}