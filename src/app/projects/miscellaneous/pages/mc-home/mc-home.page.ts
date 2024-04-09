import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { McRoutingService } from '../../services/router/mc-routing.service';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mc-home',
  templateUrl: './mc-home.page.html',
  styleUrls: ['./mc-home.page.scss'],
})

export class McHomePage implements OnInit {

    coreData = coreDataJson;
    isNativePlatform: boolean = false;

    constructor(
        private _appHelperService: AppHelperService,
        private _mcRoutingService: McRoutingService,
        private _actionSheetService: ActionSheetService,
    ) { }

    ngOnInit() {
        this._setupMcHome();
    }

    private _setupMcHome() {
        this.isNativePlatform = this._appHelperService.isNative();
    }

    async openProfileActionSheet() {
        const profileActionSheet = await this._actionSheetService.createProfileActionSheet();
        await profileActionSheet.present();
    }

    reminderAppClicked() {
        this._mcRoutingService.goToMcReminder();
    }
}
