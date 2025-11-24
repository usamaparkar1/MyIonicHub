import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import { McRoutingService } from 'src/app/projects/miscellaneous/services/router/mc-routing.service';
import miscellaneousJson from 'src/assets/json-data/projects/miscellaneous/miscellaneous-data.json';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SqliteStorageService } from 'src/app/services/storage/sqlite-storage.service';
import { CbRoutingHelpers, McRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { Projects } from 'src/app/models/projects';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    standalone: false
})

export class DashboardPage implements OnInit {

    isLoadingContent: boolean = true;
    contractBookerData = contractBookerJson;
    miscellaneousData = miscellaneousJson;
    coreData = coreDataJson;
    projects$: Observable<Projects[]> = this._projectsService.getAllProjects();

    constructor(
        private _routingService: RoutingService,
        private _projectsService: ProjectsService,
        private _cbRoutingService: CbRoutingService,
        private _mcRoutingService: McRoutingService,
        private _appHelperService: AppHelperService,
        private _sqliteStorageService: SqliteStorageService,
        private _authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this._dashboardInit();
    }

    private async _dashboardInit() {
        this._showLoadingContent(false);
    }

    private _showLoadingContent(value: boolean) {
        this.isLoadingContent = value;
    }

    selectApplication(appName: string) {
        if (appName === this.contractBookerData.appName) {
            this.selectContractBookerApp();
        } else if (appName === this.miscellaneousData.appName) {
            this.selectMiscellaneousApp();
        }
    }

    async selectContractBookerApp() {
        this._appHelperService.setCurrentAppInUseToken(CbRoutingHelpers.cbHome);
        await this._sqliteStorageService.setCurrentAppInUse(CbRoutingHelpers.cbHome);
        await this.goToContractBooker();
    }

    async goToContractBooker() {
        await this._cbRoutingService.goToCbHome();
    }

    async selectMiscellaneousApp() {
        this._appHelperService.setCurrentAppInUseToken(McRoutingHelpers.mcHome);
        await this._sqliteStorageService.setCurrentAppInUse(McRoutingHelpers.mcHome);
        await this.goToMiscellaneous();
    }

    async goToMiscellaneous() {
        await this._mcRoutingService.goToMcHome();
    }

    async logoutUser() {
        await this._authenticationService.logoutUser();
        await this._routingService.goToLogin();
    }
}