import { AppHelperService } from '../app-helper/app-helper.service';
import { storageSchema } from 'src/assets/schemas/storage-schema';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { storageHelpers } from 'src/app/helpers/storage-helpers';
import { toastHelpers } from 'src/app/helpers/toast-helpers';
import { localHelpers } from 'src/app/helpers/local-helpers';
import { SqliteService } from '../sqlite/sqlite.service';
import { ToastService } from '../toast/toast.service';
import { DbService } from '../db/db.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

    private _storageDbConnection!: SQLiteDBConnection;

    constructor(
        private _dbService: DbService,
        private _toastService: ToastService,
        private _sqliteService: SqliteService,
        private _appHelperService: AppHelperService
    ) {}

    async initializeDatabase() {
        // create upgrade statements
        await this._sqliteService.addUpgradeStatement(storageSchema.databaseName, storageSchema.toVersion, storageSchema.statements);

        // create and/or open the database
        await this.openDatabase();

        this._dbService.set(storageSchema.databaseName, storageSchema.toVersion);
        
        if (this._sqliteService.isWeb) {
            await this._sqliteService.sqliteConnection.saveToStore(storageSchema.databaseName);
        }
    }

    async openDatabase(): Promise<void> {
        return await new Promise(async (resolve) => {
            if (this._sqliteService.isNative) {
                const isInConfigEncryption =(await this._sqliteService.isInConfigEncryption())?.result;
                const isDatabaseEncrypted = (await this._sqliteService.isDatabaseEncrypted(storageSchema.databaseName))?.result;

                if (isInConfigEncryption && isDatabaseEncrypted) {
                    this._storageDbConnection = await this._sqliteService.openDatabase(storageSchema.databaseName, true, "secret", storageSchema.toVersion, false);
                } else {
                    this._storageDbConnection = await this._sqliteService.openDatabase(storageSchema.databaseName, false, "no-encryption", storageSchema.toVersion, false);
                }
            } else {
                this._storageDbConnection = await this._sqliteService.openDatabase(storageSchema.databaseName, false, "no-encryption", storageSchema.toVersion, false);
            }

            resolve();
        });
    }

    async get(key: string): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            try {
                let response = undefined;

                const data = await this._storageDbConnection.query(`SELECT * FROM ${storageHelpers.storageTableName} WHERE key="${key}"`);
    
                if (data.values!.length > 0) {
                    const keyValuePair = data.values!.find((x) => x?.key === key);
    
                    if (Object.keys(keyValuePair)?.length > 0) {
    
                        if (keyValuePair?.value?.length > 0) {
                            if (keyValuePair?.value === 'true') {
                                response = true;
                            } else if (keyValuePair?.value === 'false') {
                                response = false;
                            } else {
                                response = JSON.parse(keyValuePair?.value);
                            }
                        }
                    }
                }
    
                resolve(response);   
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: 'Storage Service Get Error',
                    message: `Error setting data in for key:${key}`,
                });
                reject(null);
            }
        });
    }

    async set(key: string, value: any): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            const valueExists: boolean = await this.get(key);

            try {
                const storageData = new StorageModel({ key: key, value: JSON.stringify(value) });

                if (this._appHelperService.isNotNullAndNotUndefined(valueExists)) {
                    await this._sqliteService.save(this._storageDbConnection, storageHelpers.storageTableName, storageData, { key: key });
                } else {
                    await this._sqliteService.save(this._storageDbConnection, storageHelpers.storageTableName, storageData);
                }

                await this._saveDataToWebStore();
                resolve(true);
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: 'Storage Service Set Error',
                    message: `Error setting data in for key:${key} and value:${value}`,
                });
                reject(null);
            }
        });
    }

    async remove(key: string): Promise<boolean> {
        return await new Promise(async (resolve, reject) => {
            try {
                const valueExists: boolean = await this.get(key);
                if (valueExists) {
                    await this._storageDbConnection.query(`DELETE FROM ${storageHelpers.storageTableName} WHERE key="${key}"`);
                    await this._saveDataToWebStore();
                }

                resolve(true);
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: 'Storage Service Remove Error',
                    message: `Error removing data in for key:${key}`,
                });
                reject(false);
            }
        });
    }

    async clear(): Promise<void> {
        return await new Promise(async (resolve, reject) => {
            try {
                await this._storageDbConnection.query(`DELETE FROM ${storageHelpers.storageTableName}`);
                await this._saveDataToWebStore();
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.clearStorageError,
                    header: 'Error in Clear in Storage Serivce',
                    message: `Error clearing all data in table: ${storageHelpers.storageTableName}`,
                });
            }
        });
    }

    /** @description Save to store is important to maintain state of the data in web. */
    private async _saveDataToWebStore() {
        if (this._sqliteService.isWeb) {
            await this._sqliteService.sqliteConnection.saveToStore(storageSchema.databaseName);
        }
    }

    async isAppSetup(): Promise<any> {
        return await this.get(localHelpers.isAppSetup);
    }

    async hasSeenIntro(): Promise<boolean> {
        return await this.get(storageHelpers.introSeen);
    }

    async isUserLoggedIn(): Promise<boolean> {
        return await this.get(storageHelpers.isUserLoggedIn);
    }
}

export class StorageModel implements IStorageModel {
    key?: string;
    value?: string | undefined
  
    constructor(storageModel?: StorageModel) {
        this.key = storageModel?.key;
        this.value = storageModel?.value;
    }
}
  
export interface IStorageModel {
    key?: string;
    value?: string | undefined
}
  
