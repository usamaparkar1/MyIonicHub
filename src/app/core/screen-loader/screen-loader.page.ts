import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import { McRoutingService } from 'src/app/projects/miscellaneous/services/router/mc-routing.service';
import { CbRoutingHelpers, McRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { StorageService } from 'src/app/services//storage/storage.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { NavigationBehaviorOptions } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-screen-loader',
  templateUrl: './screen-loader.page.html',
  styleUrls: ['./screen-loader.page.scss'],
})

export class ScreenLoaderPage implements OnInit {

    constructor(
        private _storageService: StorageService,
        private _routingService: RoutingService,
        private _cbRoutingService: CbRoutingService,
        private _mcRoutingService: McRoutingService,
        private _appHelperService: AppHelperService,
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
        if (await this._storageService.hasSeenIntro()) {
            this._appHelperService.setUserHasSeenIntroToken();
        }
    }

    private async _checkIfUserIsLoggedIn() {
        if (await this._storageService.isUserLoggedIn()) {
            this._appHelperService.setUserIsLoggedInToken();
        }
    }

    private async _checkIfCurrentAppIsSelected() {
        const currentAppHomeRoute = this._appHelperService.getStringOrNull(await this._storageService.isCurrentAppInUse());
        if (currentAppHomeRoute) {
            this._appHelperService.setCurrentAppInUseToken(currentAppHomeRoute);
        }
    }

    async completeAppSetup() {
        if (!await this._storageService.isAppSetup()) {
            await this._storageService.setIsAppSetupInStorage();
            this._appHelperService.setIsAppSetupToken();
        }
    }

    private async _navigateToNextPage() {
        const navigationBehaviorOptions: NavigationBehaviorOptions = { skipLocationChange: true, replaceUrl: true };
        if (!this._appHelperService.userHasSeenIntro) {
            await this._routingService.goToIntroduction(navigationBehaviorOptions);
            return;
        }

        if (!this._appHelperService.isUserLoggedIn) {
            await this._routingService.goToLogin(navigationBehaviorOptions);
            return;
        }

        if (this._appHelperService.getCurrentAppInUseToken) {
            switch (this._appHelperService.getCurrentAppInUseToken) {
                case CbRoutingHelpers.cbHome:
                    await this._cbRoutingService.goToCbHome();
                    break;
                case McRoutingHelpers.mcHome:
                    await this._mcRoutingService.goToMcHome();
                    break;

                default:
                    await this._routingService.goToDashboard(navigationBehaviorOptions);
                    break;
            }
            return;
        }

        await this._routingService.goToDashboard(navigationBehaviorOptions);
    }
}
