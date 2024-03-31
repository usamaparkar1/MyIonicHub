import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';
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

    constructor(
        private _mcRoutingService: McRoutingService,
        private _actionSheetService: ActionSheetService
    ) { }

    ngOnInit() {
    }

    async openProfileActionSheet() {
        const profileActionSheet = await this._actionSheetService.createProfileActionSheet();
        await profileActionSheet.present();
    }

    reminderAppClicked() {
        this._mcRoutingService.goToMcReminder();
    }
}
