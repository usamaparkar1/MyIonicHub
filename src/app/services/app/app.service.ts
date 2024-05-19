import { CbDbAppointmentsService } from 'src/app/projects/contract-booker/services/cb-db-appointments/cb-db-appointments.service';
import { CbDbMyContractsService } from 'src/app/projects/contract-booker/services/cb-db-my-contracts/cb-db-my-contracts.service';
import { SqliteStorageService } from '../storage/sqlite-storage.service';
import { alertHelpers } from 'src/app/helpers/alert-helpers';
import { NetworkService } from '../network/network.service';
import { SqliteService } from '../sqlite/sqlite.service';
import { SignupService } from '../signup/signup.service';
import { AlertService } from '../alert/alert.service';
import { UserService } from '../user/user.service';
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
        private _networkService: NetworkService,
        private _sqliteStorageService: SqliteStorageService,
        private _cbDbMyContractsService: CbDbMyContractsService,
        private _cbDbAppointmentsService: CbDbAppointmentsService,
    ) {}

    async initializeApp() {
        await this._sqliteService.initializePlugin().then(async (ret) => {
            this._currentPlatform = Capacitor.getPlatform();
            
            await this._networkService.networkInit();
            await this._setupWebStore();
            await this._createStorageSchema();
            await this._createUserSchema();
            await this._createMyContractsSchema();
            await this._createAppointmentsSchema();
            
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
            await this._sqliteStorageService.initializeDatabase();
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
        } catch (error) {
            await this._alertService.showAlert(
                alertHelpers.myContractsDatabaseNotSetup,
                'AppService cannot initializeMyContractsDatabase',
                `${error}`
            );
        }
    }

    private async _createAppointmentsSchema() {
        try {
            await this._cbDbAppointmentsService.initializeAppointmentsDatabase();
        } catch (error) {
            await this._alertService.showAlert(
                alertHelpers.myContractsDatabaseNotSetup,
                'AppService cannot initializeAppointmentsDatabase',
                `${error}`
            );
        }
    }
}
