import { myContractsSchema } from 'src/assets/schemas/projects/contract-booker/cb-my-contracts-schema';
import { cbMyContractsDbHelpers } from '../../helpers/cb-my-contracts-db-helpers';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { SqliteService } from 'src/app/services/sqlite/sqlite.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { toastHelpers } from 'src/app/helpers/toast-helpers';
import { DbService } from 'src/app/services/db/db.service';
import { Contract } from '../../models/cb-contract';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CbDbMyContractsService {

    private _myContractsDbConnection!: SQLiteDBConnection;

    get getMyContractsDbConnection(): SQLiteDBConnection {
        return this._myContractsDbConnection;
    }

    constructor(
        private _dbService: DbService,
        private _toastService: ToastService,
		private _sqliteService: SqliteService,
        private _appHelperService: AppHelperService,
    ) { }

    async initializeMyContractsDatabase() {
        // create upgrade statements
        await this._sqliteService.addUpgradeStatement(myContractsSchema.databaseName, myContractsSchema.toVersion, myContractsSchema.statements);

        // create and/or open the database
        await this.openDatabase();

        this._dbService.set(myContractsSchema.databaseName, myContractsSchema.toVersion);
        
        if (this._sqliteService.isWeb) {
            await this._sqliteService.sqliteConnection.saveToStore(myContractsSchema.databaseName);
        }
    }
    
    async openDatabase(): Promise<void> {
        return await new Promise(async (resolve) => {
            if (this._sqliteService.isNative) {
                const isInConfigEncryption =(await this._sqliteService.isInConfigEncryption())?.result;
                const isDatabaseEncrypted = (await this._sqliteService.isDatabaseEncrypted(myContractsSchema.databaseName))?.result;

                if (isInConfigEncryption && isDatabaseEncrypted) {
                    this._myContractsDbConnection = await this._sqliteService.openDatabase(myContractsSchema.databaseName, true, "secret", myContractsSchema.toVersion, false);
                } else {
                    this._myContractsDbConnection = await this._sqliteService.openDatabase(myContractsSchema.databaseName, false, "no-encryption", myContractsSchema.toVersion, false);
                }
            } else {
                this._myContractsDbConnection = await this._sqliteService.openDatabase(myContractsSchema.databaseName, false, "no-encryption", myContractsSchema.toVersion, false);
            }

            resolve();
        });
    }

    async get(contractId: string): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            try {
                let response = undefined;

                const data = await this._myContractsDbConnection.query(`SELECT * FROM ${cbMyContractsDbHelpers.tableName} WHERE id="${contractId}"`);
    
                if (data.values!.length > 0) {
                    const keyValuePair = data.values!.find((x) => x?.id === contractId);
    
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
                    header: 'Contracts Db Service Get Error',
                    message: `Error setting contract for contractId:${contractId}`,
                });
                reject(null);
            }
        });
    }

    async getAll(): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            try {
                let response = undefined;

                const data = await this._myContractsDbConnection.query(`SELECT * FROM ${cbMyContractsDbHelpers.tableName}`);

                if (data.values!.length > 0) {
                    response = data.values;
                }

                resolve(response);   
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: 'My Contracts Service Get All Error',
                    message: 'Error getting all contracts',
                });
                reject(null);
            }
        });
    }

    async set(contract: Contract): Promise<boolean | null> {
        return await new Promise(async (resolve, reject) => {
            const valueExists: boolean = await this.get(contract.id);

            try {
                if (this._appHelperService.isNotNullAndNotUndefined(valueExists)) {
                    await this._sqliteService.save(this._myContractsDbConnection, cbMyContractsDbHelpers.tableName, contract, { id: contract.id });
                } else {
                    await this._sqliteService.save(this._myContractsDbConnection, cbMyContractsDbHelpers.tableName, contract);
                }

                await this._saveDataToWebStore();

                resolve(true);
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: 'Contracts Db Service Set Error',
                    message: `Error setting contract for contractId:${contract.id} and contract:${contract}`,
                });
                reject(null);
            }
        });
    }

    async remove(contract: Contract): Promise<boolean> {
        return await new Promise(async (resolve, reject) => {
            try {
                const valueExists: boolean = await this.get(contract.id);
                if (valueExists) {
                    await this._myContractsDbConnection.query(`DELETE FROM ${cbMyContractsDbHelpers.tableName} WHERE id="${contract.id}"`);
                    await this._saveDataToWebStore();
                }

                resolve(true);
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: 'My Contracts Service Remove Error',
                    message: `Error removing contract for contractId:${contract.id}`,
                });
                reject(false);
            }
        });
    }

    async clear(): Promise<void> {
        return await new Promise(async (resolve, reject) => {
            try {
                await this._myContractsDbConnection.query(`DELETE FROM ${cbMyContractsDbHelpers.tableName}`);
                await this._saveDataToWebStore();
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.clearStorageError,
                    header: 'Error in Clear in My Contracts Serivce',
                    message: `Error clearing all contracts in table: ${cbMyContractsDbHelpers.tableName}`,
                });
            }
        });
    }

    /** @description Save to store is important to maintain state of the data in web. */
    private async _saveDataToWebStore() {
        if (this._sqliteService.isWeb) {
            await this._sqliteService.sqliteConnection.saveToStore(myContractsSchema.databaseName);
        }
    }
}
