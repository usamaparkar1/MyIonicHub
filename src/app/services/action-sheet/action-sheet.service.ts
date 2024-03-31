import { AuthenticationService } from '../authentication/authentication.service';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { actionSheetHelpers } from 'src/app/helpers/action-sheet-helpers';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { RoutingService } from '../routing/routing.service';
import { Injectable } from '@angular/core';
import { TranslationService } from '../translation/translation.service';

@Injectable({
  providedIn: 'root'
})

export class ActionSheetService {

    coreData = coreDataJson;
    profileActionSheetButtons: ActionSheetButton[] = [
        {
            icon: this.coreData.appLogoutIconUrl,
            text: this._translationService.instant('ACTION_SHEET.PROFILE.APP_LOGOUT'),
            handler: async () => {
                await this.onAppLogoutFromProfileSheet()
            }
        },
        {
            icon: this.coreData.logoutIconUrl,
            text: this._translationService.instant('ACTION_SHEET.PROFILE.ACCOUNT_LOGOUT'),
            handler: async () => {
                await this.onAccountLogoutFromProfileSheet();
            }
        },
    ];

    constructor(
        private _routingService: RoutingService,
        private _translationService: TranslationService,
        private _actionSheetController: ActionSheetController,
        private _authenticationService: AuthenticationService,
    ) {}

    async onAppLogoutFromProfileSheet() {
        await this._authenticationService.removeCurrentAppInUseFromStorage();
        this._routingService.goToDashboard();
    }

    async onAccountLogoutFromProfileSheet() {
        await this._authenticationService.removeCurrentAppInUseFromStorage();
        await this._authenticationService.removeLoginTokenFromStorage();
        this._routingService.goToLogin();
    }

    async createProfileActionSheet(): Promise<HTMLIonActionSheetElement>{
        return await this._actionSheetController.create({
            id: actionSheetHelpers.profile,
            buttons: this.profileActionSheetButtons
        });
    }
}
