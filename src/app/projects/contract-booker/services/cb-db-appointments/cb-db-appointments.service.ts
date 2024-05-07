import { cbAppointmentsSchemas } from 'src/assets/schemas/projects/contract-booker/cb-appointments-schema';
import { cbAppointmentsDbHelpers } from '../../helpers/cb-appointments-db-helpers';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { SqliteService } from 'src/app/services/sqlite/sqlite.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { toastHelpers } from 'src/app/helpers/toast-helpers';
import { DbService } from 'src/app/services/db/db.service';
import { CbAppointment } from '../../models/cb-appoinment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CbDbAppointmentsService {

    private _appointmentsDbConnection!: SQLiteDBConnection;

    get getAppointmentsDbConnection(): SQLiteDBConnection {
        return this._appointmentsDbConnection;
    }

    constructor(
        private _dbService: DbService,
        private _toastService: ToastService,
        private _sqliteService: SqliteService,
        private _appHelperService: AppHelperService,
    ) { }

    async initializeAppointmentsDatabase() {
        // create upgrade statements
        await this._sqliteService.addUpgradeStatement(cbAppointmentsSchemas.databaseName, cbAppointmentsSchemas.toVersion, cbAppointmentsSchemas.statements);

        // create and/or open the database
        await this.openDatabase();

        this._dbService.set(cbAppointmentsSchemas.databaseName, cbAppointmentsSchemas.toVersion);
        
        if (this._sqliteService.isWeb) {
            await this._sqliteService.sqliteConnection.saveToStore(cbAppointmentsSchemas.databaseName);
        }
    }
    
    async openDatabase(): Promise<void> {
        return await new Promise(async (resolve) => {
            if (this._sqliteService.isNative) {
                const isInConfigEncryption =(await this._sqliteService.isInConfigEncryption())?.result;
                const isDatabaseEncrypted = (await this._sqliteService.isDatabaseEncrypted(cbAppointmentsSchemas.databaseName))?.result;

                if (isInConfigEncryption && isDatabaseEncrypted) {
                    this._appointmentsDbConnection = await this._sqliteService.openDatabase(cbAppointmentsSchemas.databaseName, true, "secret", cbAppointmentsSchemas.toVersion, false);
                } else {
                    this._appointmentsDbConnection = await this._sqliteService.openDatabase(cbAppointmentsSchemas.databaseName, false, "no-encryption", cbAppointmentsSchemas.toVersion, false);
                }
            } else {
                this._appointmentsDbConnection = await this._sqliteService.openDatabase(cbAppointmentsSchemas.databaseName, false, "no-encryption", cbAppointmentsSchemas.toVersion, false);
            }

            resolve();
        });
    }

    async get(appointmentId: string): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            try {
                let response = undefined;

                const data = await this._appointmentsDbConnection.query(`SELECT * FROM ${cbAppointmentsDbHelpers.tableName} WHERE id="${appointmentId}"`);

                if (data.values!.length > 0) {
                    const keyValuePair = data.values!.find((x) => x?.id === appointmentId);

                    if (Object.keys(keyValuePair)?.length > 0) {
                        response = keyValuePair;
                    }
                }

                resolve(response);   
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: `${cbAppointmentsSchemas.databaseName} Service Get Error`,
                    message: `Error setting appointment for appointmentId:${appointmentId}`,
                });
                reject(null);
            }
        });
    }

    async getAll(): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            try {
                let response = undefined;

                const data = await this._appointmentsDbConnection.query(`SELECT * FROM ${cbAppointmentsDbHelpers.tableName}`);

                if (data.values!.length > 0) {
                    response = data.values;
                }

                resolve(response);   
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: `${cbAppointmentsSchemas.databaseName} Service Get All Error`,
                    message: 'Error getting all appointments',
                });
                reject(null);
            }
        });
    }

    async set(appointment: CbAppointment): Promise<boolean | null> {
        return await new Promise(async (resolve, reject) => {
            const valueExists: boolean = await this.get(appointment.id);

            try {
                if (this._appHelperService.isNotNullAndNotUndefined(valueExists)) {
                    await this._sqliteService.save(this._appointmentsDbConnection, cbAppointmentsDbHelpers.tableName, appointment, { id: appointment.id });
                } else {
                    await this._sqliteService.save(this._appointmentsDbConnection, cbAppointmentsDbHelpers.tableName, appointment);
                }

                await this._saveDataToWebStore();

                resolve(true);
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: `${cbAppointmentsSchemas.databaseName} Service Set Error`,
                    message: `Error setting appointment for appointmentId:${appointment.id} and appointment:${appointment}`,
                });
                reject(null);
            }
        });
    }

    async remove(appointment: CbAppointment): Promise<boolean> {
        return await new Promise(async (resolve, reject) => {
            try {
                const valueExists: boolean = await this.get(appointment.id);
                if (valueExists) {
                    await this._appointmentsDbConnection.query(`DELETE FROM ${cbAppointmentsDbHelpers.tableName} WHERE id="${appointment.id}"`);
                    await this._saveDataToWebStore();
                }

                resolve(true);
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.storageSetError,
                    header: `${cbAppointmentsSchemas.databaseName} Service Remove Error`,
                    message: `Error removing appointment for appointmentId:${appointment.id}`,
                });
                reject(false);
            }
        });
    }

    async clear(): Promise<void> {
        return await new Promise(async (resolve, reject) => {
            try {
                await this._appointmentsDbConnection.query(`DELETE FROM ${cbAppointmentsDbHelpers.tableName}`);
                await this._saveDataToWebStore();
            } catch (error) {
                console.error(error);
                this._toastService.showToast({
                    id: toastHelpers.clearStorageError,
                    header: `Error in Clear in ${cbAppointmentsSchemas.databaseName} Serivce`,
                    message: `Error clearing all appointments in table: ${cbAppointmentsDbHelpers.tableName}`,
                });
            }
        });
    }

    /** @description Save to store is important to maintain state of the data in web. */
    private async _saveDataToWebStore() {
        if (this._sqliteService.isWeb) {
            await this._sqliteService.sqliteConnection.saveToStore(cbAppointmentsSchemas.databaseName);
        }
    }
}
