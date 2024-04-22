import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import contractBookerJson from 'src/assets/json-data/projects/contract-booker-data.json';
import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';
import { CbContractService } from '../../services/contract/cb-contract.service';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-home',
  templateUrl: './cb-home.page.html',
  styleUrls: ['./cb-home.page.scss'],
})

export class CbHomePage implements OnInit {

    contractBookerData = contractBookerJson;
    coreData = coreDataJson;

    constructor(
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService,
        private _actionSheetService: ActionSheetService,
    ) {}

    ngOnInit() {
        this._initCbHomePage();
    }

    private async _initCbHomePage() {}

    isCartCountGreaterThanZero() {
        return this._cbContractService.contracts?.length > 0;
    }

    async openProfileActionSheet() {
        const profileActionSheet = await this._actionSheetService.createProfileActionSheet();
        await profileActionSheet.present();
    }

    async startConsultation() {
        if (this.isCartCountGreaterThanZero()) {
            const lastUsedContract = this._cbContractService.getLastUsedContract();
            if (lastUsedContract?.currentRoute) {
                this._cbRoutingService.findLastUsedRoute(lastUsedContract);
            } else {
                this.openShoppingCart();
            }
        } else {
            await this._cbRoutingService.goToCbCustomerAddress();
        }
    }

    openShoppingCart() {
    }
}
