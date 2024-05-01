import { CbDbMyContractsService } from '../projects/contract-booker/services/my-db-contracts/cb-db-my-contracts.service';
import { StorageService } from './storage/storage.service';
import { SqliteService } from './sqlite/sqlite.service';
import { alertHelpers } from '../helpers/alert-helpers';
import { SignupService } from './signup/signup.service';
import { AlertService } from './alert/alert.service';
import { NetworkService } from './network.service';
import { UserService } from './user/user.service';
import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppService {

    private _currentPlatform: string = Capacitor.getPlatform();

    isAppInit: boolean = false;

    constructor(
        private _userService: UserService,
        private _alertService: AlertService,
        private _signupService: SignupService,
        private _sqliteService: SqliteService,
        private _storageService: StorageService,
        private _networkService: NetworkService,
        private _cbDbMyContractsService: CbDbMyContractsService,
    ) {}

    async initializeApp() {
        await this._sqliteService.initializePlugin().then(async (ret) => {
            this._currentPlatform = Capacitor.getPlatform();
            
            await this._networkService.networkInit();
            await this._setupWebStore();
            await this._createStorageSchema();
            await this._createUserSchema();
            await this._createMyContractsSchema();
            
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
            await this._signupService.setUserDbConnection(this._userService.getUserDbConnection);
        } catch (error) {
            console.error(error);
            await this._alertService.showAlert(
                alertHelpers.sqliteDatabaseNotSetup,
                'AppService cannot initializeUserDatabase',
                `${error}`
            );
        }
    }

    private async _createMyContractsSchema() {
        try {
            await this._cbDbMyContractsService.initializeMyContractsDatabase();
            await this._signupService.setUserDbConnection(this._userService.getUserDbConnection);
        } catch (error) {
            await this._alertService.showAlert(
                alertHelpers.myContractsDatabaseNotSetup,
                'AppService cannot initializeMyContractsDatabase',
                `${error}`
            );
        }
    }
}
