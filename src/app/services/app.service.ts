import { Capacitor } from '@capacitor/core';
import { SqliteService } from './sqlite/sqlite.service';
import { Injectable } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { AlertService } from './alert/alert.service';
import { alertHelpers } from '../helpers/alert-helpers';

@Injectable({
  providedIn: 'root'
})

export class AppService {

    isAppInit: boolean = false;
    private _currentPlatform: string = Capacitor.getPlatform();

    constructor(
        private _alertService: AlertService,
        private sqliteService: SqliteService,
        private _storageService: StorageService,
    ) {}

    async initializeApp() {
        await this.sqliteService.initializePlugin().then(async (ret) => {
            this._currentPlatform = Capacitor.getPlatform();
            const isAppOnWeb = (): boolean =>  {
                return this._currentPlatform === 'web';
            }

            try {
                if (isAppOnWeb()) {
                    await this.sqliteService.initWebStore();
                }
            } catch (error) {
                console.error(error);
                await this._alertService.showAlert(
                    alertHelpers.webStoreNotSetup,
                    'AppService cannot initializeWebStore',
                    `${error}`
                );
                return;
            }

            try {
                await this._storageService.initializeDatabase();
            } catch (error) {
                console.error(error);
                await this._alertService.showAlert(
                    alertHelpers.sqliteDatabaseNotSetup,
                    'AppService cannot initializeStorageDatabase',
                    `${error}`
                );
            }
                
            this.isAppInit = true;
        });
    }
}
