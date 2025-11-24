import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import { McRoutingService } from 'src/app/projects/miscellaneous/services/router/mc-routing.service';
import { SqliteStorageService } from 'src/app/services//storage/sqlite-storage.service';
import { CbRoutingHelpers, McRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-screen-loader',
    templateUrl: './screen-loader.page.html',
    styleUrls: ['./screen-loader.page.scss'],
    standalone: false
})

export class ScreenLoaderPage implements OnInit {

    constructor(
        private _routingService: RoutingService,
        private _cbRoutingService: CbRoutingService,
        private _mcRoutingService: McRoutingService,
        private _appHelperService: AppHelperService,
        private _sqliteStorageService: SqliteStorageService,
    ) {}

    ngOnInit() {
        this._init();
    }

    private async _init() {
        await this._setAppHelpers();
        await this._navigateToNextPage();
    }

    private async _setAppHelpers() {
        await this._checkIfUserHasSeenIntro();
        await this._checkIfUserIsLoggedIn();
        await this._checkIfCurrentAppIsSelected();
        await this.completeAppSetup();
    }

    private async _checkIfUserHasSeenIntro() {
        if (await this._sqliteStorageService.hasSeenIntro()) {
            this._appHelperService.setUserHasSeenIntroToken();
        }
    }

    private async _checkIfUserIsLoggedIn() {
        if (await this._sqliteStorageService.isUserLoggedIn()) {
            this._appHelperService.setUserIsLoggedInToken();
        }
    }

    private async _checkIfCurrentAppIsSelected() {
        const currentAppHomeRoute = this._appHelperService.getStringOrNull(await this._sqliteStorageService.isCurrentAppInUse());
        if (currentAppHomeRoute) {
            this._appHelperService.setCurrentAppInUseToken(currentAppHomeRoute);
        }
    }

    async completeAppSetup() {
        if (!await this._sqliteStorageService.isAppSetup()) {
            await this._sqliteStorageService.setIsAppSetupInStorage();
            this._appHelperService.setIsAppSetupToken();
        }
    }

    private _navigateToNextPage() {
        if (!this._appHelperService.userHasSeenIntro) {
            this._routingService.goToIntroduction({ replaceUrl: true });
            return;
        }

        if (!this._appHelperService.isUserLoggedIn) {
            this._routingService.goToLogin({ replaceUrl: true });
            return;
        }

        if (this._appHelperService.getCurrentAppInUseToken) {
            switch (this._appHelperService.getCurrentAppInUseToken) {
                case CbRoutingHelpers.cbHome:
                    this._cbRoutingService.goToCbHome({ replaceUrl: true });
                    break;
                case McRoutingHelpers.mcHome:
                    this._mcRoutingService.goToMcHome({ replaceUrl: true });
                    break;

                default:
                    this._routingService.goToDashboard({ replaceUrl: true });
                    break;
            }
            return;
        }

        this._routingService.goToDashboard({ replaceUrl: true });
    }
}
