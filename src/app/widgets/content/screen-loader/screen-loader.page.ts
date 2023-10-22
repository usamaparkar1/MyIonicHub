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
        private _apphelperService: AppHelperService,
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
            this._apphelperService.hasSeenIntro$.next(true);
        }
    }

    private async _checkIfUserIsLoggedIn() {
        if (await this._storageService.isUserLoggedIn()) {
            this._apphelperService.isloggedIn$.next(true);
        }
    }

    async completeAppSetup() {
        if (!await this._storageService.isAppSetup()) {
            await this._storageService.set(localHelpers.isAppSetup, true);
            this._apphelperService.isAppSetup$.next(true);
        }
    }

    private async _navigateToNextPage() {
        if (!this._apphelperService.hasSeenIntro$.getValue()) {
            await this._routingService.goToIntroduction();
            return;
        }

        if (!this._apphelperService.isloggedIn$.getValue()) {
            await this._routingService.goToIntroduction();
            return;
        }

        await this._routingService.goToDashboard();
    }
}
