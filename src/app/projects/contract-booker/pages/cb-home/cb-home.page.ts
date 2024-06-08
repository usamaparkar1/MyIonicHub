import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbHomeService } from '../../services/home/cb-home.service';
import { CbHomePageLink } from '../../models/cb-home-page-link';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cb-home',
    templateUrl: './cb-home.page.html',
    styleUrls: ['./cb-home.page.scss'],
})

export class CbHomePage implements OnInit, OnDestroy {

    private _homeModulesSubscription!: Subscription;

    contractBookerData = contractBookerJson;
    cbHomeModules: CbHomePageLink[] = [];
    isScreenSmall: boolean = false;

    constructor(
        private _cbHomeService: CbHomeService,
        private _appHelperService: AppHelperService,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService,
        private _actionSheetService: ActionSheetService,
    ) {}

    ngOnInit() {
        this._initCbHomePage();
    }

    private async _initCbHomePage() {
        this._subscribeToEvents();
    }

    ngOnDestroy() {
        this._homeModulesSubscription.unsubscribe();
    }

    private _subscribeToEvents() {
        this._subscribeToHomeModules();
    }

    private _subscribeToHomeModules() {
        this._homeModulesSubscription = this._cbHomeService.homeModules.subscribe((homeModules) => {
            this.cbHomeModules = homeModules;
        });
    }

    getColumnClass(): string {
        return this._appHelperService.isScreenSmall() ? '6' : '4';
    }

    isCartCountGreaterThanZero() {
        return this.cbHomeModules[2].count > 0;
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
            this._cbRoutingService.goToCbNews();
        } else if(cbHomePageLink.id === 2) {
            this._cbRoutingService.goToCbAppointments();
        } else if(cbHomePageLink.id === 3) {
            this._cbRoutingService.goToCbMyContracts();
        } else if(cbHomePageLink.id === 4) {
            this.startConsultation();
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
