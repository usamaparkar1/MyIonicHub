import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import contractBookerJson from 'src/assets/json-data/projects/contract-booker-data.json';
import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbHomePageLink } from '../../models/cb-home-page-link';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cb-home',
  templateUrl: './cb-home.page.html',
  styleUrls: ['./cb-home.page.scss'],
})

export class CbHomePage implements OnInit, OnDestroy {

    contractBookerData = contractBookerJson;
    coreData = coreDataJson;
    contracts: Contract[] = [];
    contractsSubscription!: Subscription;
    cbHomeModules: CbHomePageLink[] = [
        {
            id: 1,
            name: this._translateService.instant('CB.HOME.START_CONSULTATION'),
            image: this.contractBookerData.consultationStartImage
        },
        {
            id: 2,
            name: this._translateService.instant('CB.HOME.MY_CONTRACTS'),
            image: this.contractBookerData.consultationStartImage
        }
    ];

    constructor(
        private _translateService: TranslateService,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService,
        private _actionSheetService: ActionSheetService,
    ) {}

    ngOnInit() {
        this._initCbHomePage();
    }

    private async _initCbHomePage() {
        this.contractsSubscription = this._cbContractService.contracts.subscribe((contracts) => {
            this.contracts = contracts;
        });
    }

    ngOnDestroy() {
        this.contractsSubscription.unsubscribe();
    }

    isCartCountGreaterThanZero() {
        return this.contracts?.length > 0;
    }

    async openProfileActionSheet() {
        const profileActionSheet = await this._actionSheetService.createProfileActionSheet();
        await profileActionSheet.present();
    }

    openShoppingCart() {
        this._cbRoutingService.goToCbShoppingCart();
    }

    moduleClicked(cbHomePageLink: CbHomePageLink) {
        if (cbHomePageLink.id === 1) {
            this.startConsultation();
        } else if(cbHomePageLink.id === 2) {
            this._cbRoutingService.goToMyContracts();
        }
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
}
