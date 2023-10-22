import { StorageService } from './storage/storage.service';
import { SqliteService } from './sqlite/sqlite.service';
import { alertHelpers } from '../helpers/alert-helpers';
import { AlertService } from './alert/alert.service';
import { UserService } from './user/user.service';
import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})

export class AppService {

    isAppInit: boolean = false;
    private _currentPlatform: string = Capacitor.getPlatform();

    constructor(
        private _userService: UserService,
        private _alertService: AlertService,
        private _sqliteService: SqliteService,
        private _storageService: StorageService,
        private _networkService: NetworkService,
    ) {}

    async initializeApp() {
        await this._sqliteService.initializePlugin().then(async (ret) => {
            this._currentPlatform = Capacitor.getPlatform();
            
            await this._networkService.networkInit();
            await this._setupWebStore();
            await this._createStorageSchema();
            await this._createUserSchema();
            
            this.isAppInit = true;
        });
    }

    private async  _setupWebStore() {
        const isAppOnWeb = (): boolean =>  {
            return this._currentPlatform === 'web';
        }

        try {
            if (isAppOnWeb()) {
                await this._sqliteService.initWebStore();
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
    }

    private async _createStorageSchema() {
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
    }

    private async _createUserSchema() {
        try {
            await this._userService.initializeUserDatabase();
        } catch (error) {
            console.error(error);
            await this._alertService.showAlert(
                alertHelpers.sqliteDatabaseNotSetup,
                'AppService cannot initializeUserDatabase',
                `${error}`
            );
        }
    }
}
