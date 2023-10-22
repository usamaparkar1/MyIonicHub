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
        if (await await this._storageService.isUserLoggedIn()) {
            // Navigate to home or something
        } else {
            await this._routingService.goToIntroduction();
        }
    }

    private async _setAppHelpers() {
        await this._checkIfUserHasSeenIntro();
        await this.completeAppSetup();
    }

    private async _checkIfUserHasSeenIntro() {
        if (await this._storageService.hasSeenIntro()) {
            this._apphelperService.hasSeenIntro$.next(true);
        }
    }

    async completeAppSetup() {
        if (!await this._storageService.isAppSetup()) {
            await this._storageService.set(localHelpers.isAppSetup, true);
            this._apphelperService.isAppSetup$.next(true);
        }
    }
}
