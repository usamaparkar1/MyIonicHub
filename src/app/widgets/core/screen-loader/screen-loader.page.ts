import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { StorageService } from 'src/app/services//storage/storage.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { localHelpers } from 'src/app/helpers/local-helpers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-loader',
  templateUrl: './screen-loader.page.html',
  styleUrls: ['./screen-loader.page.scss'],
})

export class ScreenLoaderPage implements OnInit {

    constructor(
        private _routingService: RoutingService,
        private _storageService: StorageService,
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

    async completeAppSetup() {
        if (!await this._storageService.isAppSetup()) {
            await this._storageService.set(localHelpers.isAppSetup, true);
            this._appHelperService.setIsAppSetupToken();
        }
    }

    private async _navigateToNextPage() {
        if (!this._appHelperService.userHasSeenIntro) {
            await this._routingService.goToIntroduction();
            return;
        }

        if (!this._appHelperService.isUserLoggedIn) {
            await this._routingService.goToIntroduction();
            return;
        }

        await this._routingService.goToDashboard();
    }
}
