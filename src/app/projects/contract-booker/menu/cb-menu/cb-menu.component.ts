import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbHomePageLink } from '../../models/cb-home-page-link';
import { IonicModule, MenuController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { Component, OnInit } from '@angular/core';

import { Menus } from 'src/app/enum/menus';
import { Subscription } from 'rxjs';

@Component({
    selector: 'cb-menu',
    imports: [IonicModule, TranslateModule],
    templateUrl: './cb-menu.component.html',
    styleUrls: ['./cb-menu.component.scss']
})

export class CbMenuComponent  implements OnInit {

    menus = Menus;
    contractBookerData = contractBookerJson;
    cbHomeModules: CbHomePageLink[] = this.contractBookerData.cbHomeModules;
    contractsSubscription!: Subscription;
    contracts: Contract[] = [];

    constructor(
        private _cbMenuController: MenuController,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService
    ) { }

    ngOnInit() {
        this._initCbHomePage();
    }

    private async _initCbHomePage() {
        this._subscribeToContracts();
    }

    ngOnDestroy() {
        this.contractsSubscription.unsubscribe();
    }

    private _subscribeToContracts() {
        this.contractsSubscription = this._cbContractService.contracts.subscribe((contracts) => {
            this.contracts = contracts;
        });
    }
  
    closeCbMenu() {
        this._cbMenuController.close(Menus.CbMenu);
    }

    moduleClicked(cbHomePageLink: CbHomePageLink) {
        if (cbHomePageLink.id === 1) {
            this._cbRoutingService.goToCbNews();
        } else if(cbHomePageLink.id === 2) {
            this._cbRoutingService.goToCbAppointments();
        } else if(cbHomePageLink.id === 3) {
            this._cbRoutingService.goToCbMyContracts();
        } else if(cbHomePageLink.id === 4) {
            this._cbRoutingService.goToCbSupport();
        }

        this.closeCbMenu();
    }

    async startConsultation() {
        if (this.isCartCountGreaterThanZero()) {
            const lastUsedContract = this._cbContractService.getLastUsedContract();
            if (lastUsedContract?.currentRoute) {
                this._cbRoutingService.findLastUsedRoute(lastUsedContract);
            } else {
                this._cbRoutingService.goToCbShoppingCart();
            }
        } else {
            await this._cbRoutingService.goToCbCustomerAddress();
        }

        this.closeCbMenu();
    }

    isCartCountGreaterThanZero() {
        return this.contracts?.length > 0;
    }
}