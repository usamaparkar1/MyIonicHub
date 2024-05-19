import { secureStorageHelpers } from 'src/app/helpers/secure-storage-helpers';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { alertHelpers } from 'src/app/helpers/alert-helpers';
import { SecureUserModel } from 'src/app/models/secure-user';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../alert/alert.service';
import { UserModel } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SecureStorageService {

    private secureUserData = new BehaviorSubject<SecureUserModel | null>(null);

    set setSecureUserData(secureUserModel: SecureUserModel) {
        this.secureUserData.next(secureUserModel);
    }

    get getSecureUserData(): SecureUserModel | null {
        return this.secureUserData.getValue();
    }

    constructor(
        private _alertService: AlertService,
        private _translateService: TranslateService
    ) { }

    async get(key: string): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            const showDataNotFoundAlert = (alertId: string, errorMessage: string) => {
                this._alertService.showAlert(
                    alertId,
                    this._translateService.instant('CORE.ERROR'),
                    errorMessage
                );
            };

            try {
                const getResult = await SecureStoragePlugin.get({ key });

                if (getResult?.value?.length > 0){
                    resolve(JSON.parse(getResult.value));
                } else {
                    showDataNotFoundAlert(
                        alertHelpers.noDataForKey,
                        this._translateService.instant('SECURE_STORAGE.KEY_DATA_NOT_FOUND', { key })
                    );
                    reject(new Error(this._translateService.instant('SECURE_STORAGE.KEY_DATA_NOT_FOUND', { key })));
                }
            } catch (error) {
                showDataNotFoundAlert(
                    alertHelpers.cannotGetSecureStorageByKey,
                    this._translateService.instant('SECURE_STORAGE.GET_KEY_ERROR', {
                        key: key,
                        error: error
                    })
                );

                reject(error);
            }
        });
    }

    async set(key: string, value: any): Promise<boolean> {
        return await new Promise(async (resolve, reject) => {
            try {
                const setReuslt = await SecureStoragePlugin.set({
                    key: key,
                    value: JSON.stringify(value)
                });

                resolve(setReuslt.value);
            } catch (error) {
                this._alertService.showAlert(
                    alertHelpers.cannotSetSecureStorage,
                    this._translateService.instant('CORE.ERROR'),
                    this._translateService.instant('SECURE_STORAGE.SET_KEY_VALUE_ERROR', {
                        key: key,
                        error: error
                    })
                );

                reject(error);
            }
        });
    }

    async remove(key: string): Promise<boolean> {
        return await new Promise(async (resolve, reject) => {
            try {
                const removeResult = await SecureStoragePlugin.remove({ key });

                resolve(removeResult.value);
            } catch (error) {
                this._alertService.showAlert(
                    alertHelpers.cannotRemoveSecureStorageByKey,
                    this._translateService.instant('CORE.ERROR'),
                    this._translateService.instant('SECURE_STORAGE.REMOVE_KEY_ERROR', {
                        key: key,
                        error: error
                    })
                );

                reject(error);
            }
        });
    }

    async clear(): Promise<boolean> {
        return await new Promise(async (resolve, reject) => {
            try {
                const clearResult = await SecureStoragePlugin.clear();

                resolve(clearResult.value);
            } catch (error) {
                this._alertService.showAlert(
                    alertHelpers.cannotClearAllSecureStorageKeys,
                    this._translateService.instant('CORE.ERROR'),
                    this._translateService.instant('SECURE_STORAGE.CLEAR_KEYS_ERROR', {
                        error: error
                    })
                );

                reject(error);
            }
        });
    }

    createSecureUserData(userModel: UserModel): SecureUserModel {
        return new SecureUserModel({
            accountId: userModel.accountId,
            username: userModel.username,
            salt: userModel.salt,
            rights: userModel.rights
        });
    }

    async loadLoggedInUserData(): Promise<boolean> {
        try {
            const response = await this.get(secureStorageHelpers.userLoginData);

            if (response) {
                // Parse string rights to number array
                const rightsStringArray: string[] = response.rights?.split(',') || [];
                const rightsNumberArray: number[] = rightsStringArray.map(num => parseInt(num, 10));
                response.rights = rightsNumberArray;
    
                // Create and set the new SecureUserModel
                const newSecureUserModel = this.createSecureUserData(response);
                this.setSecureUserData = newSecureUserModel;
    
                return true;
            }

            return false;
        } catch (error) {
            // Exception will alreaduy be handled and displayed in get call. Just return the response.
            return false;
        }
    }
}
