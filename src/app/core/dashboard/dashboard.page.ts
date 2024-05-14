import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import { McRoutingService } from 'src/app/projects/miscellaneous/services/router/mc-routing.service';
import miscellaneousJson from 'src/assets/json-data/projects/miscellaneous/miscellaneous-data.json';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CbRoutingHelpers, McRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

    isLoadingContent: boolean = true;
    contractBookerData = contractBookerJson;
    miscellaneousData = miscellaneousJson;
    coreData = coreDataJson;
    projects: ProjectCards[] = [
        {
            appName: this.contractBookerData.appName,
            appDescription: this._translateService.instant('APPS.CONTRACT_BOOKER.DESCRIPTION'),
            projectIcon: [
                {
                    altText: this.contractBookerData.appName,
                    svgSrc: this.contractBookerData.appIcon
                }
            ]
        },
        {
            appName: this.miscellaneousData.appName,
            appDescription: this._translateService.instant('APPS.MISCELLANEOUS.DESCRIPTION'),
            projectIcon: [
                {
                    altText: this.miscellaneousData.appIconAlt,
                    svgSrc: this.miscellaneousData.appIcon
                }
            ]
        }
    ];

    constructor(
        private _storageService: StorageService,
        private _routingService: RoutingService,
        private _translateService: TranslateService,
        private _cbRoutingService: CbRoutingService,
        private _mcRoutingService: McRoutingService,
        private _appHelperService: AppHelperService,
        private _authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this._dashboardInit();
    }

    private _dashboardInit() {
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
        await this._storageService.setCurrentAppInUse(CbRoutingHelpers.cbHome);
        await this.goToContractBooker();
    }

    async goToContractBooker() {
        await this._cbRoutingService.goToCbHome();
    }

    async selectMiscellaneousApp() {
        this._appHelperService.setCurrentAppInUseToken(McRoutingHelpers.mcHome);
        await this._storageService.setCurrentAppInUse(McRoutingHelpers.mcHome);
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

export interface ProjectCards {
    appName: string;
    appDescription: string;
    projectIcon: ProjectIcon[];
}

export interface ProjectIcon {
    altText: string;
    svgSrc: string;
}