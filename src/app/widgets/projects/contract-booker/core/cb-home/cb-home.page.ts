import { CbRoutingService } from 'src/app/widgets/projects/contract-booker/services/routing/cb-routing.service';
import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';
import contractBookerJson from 'src/assets/json-data/contract-booker-data.json';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-home',
  templateUrl: './cb-home.page.html',
  styleUrls: ['./cb-home.page.scss'],
})

export class CbHomePage implements OnInit {

    // JSON data
    contractBookerData = contractBookerJson;
    coreData = coreDataJson;

    constructor(
        private _cbRoutingService: CbRoutingService,
        private _actionSheetService: ActionSheetService,
    ) {}

    ngOnInit() {}

    async openProfileActionSheet() {
        const profileActionSheet = await this._actionSheetService.createProfileActionSheet();
        await profileActionSheet.present();
    }

    async startConsultation() {
        await this._cbRoutingService.goToCbCustomerAddress();
    }
}
