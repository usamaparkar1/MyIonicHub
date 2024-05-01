import { CbMyContractsService } from '../../services/my-contracts/cb-my-contracts.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cb-my-contracts',
    templateUrl: './cb-my-contracts.page.html',
    styleUrls: ['./cb-my-contracts.page.scss'],
})

export class CbMyContractsPage implements OnInit {

    private _myContractsSubscription!: Subscription;

    myContracts: Contract[] = [];
    labelContractId: string = this._translateService.instant('CB.MY_CONTRACTS.CONTRACT_ID');
    labelConsumptionPerYear: string = this._translateService.instant('CB.MY_CONTRACTS.CONSUMPTION_PER_YEAR');
    labelPricePerConsumption: string = this._translateService.instant('CB.MY_CONTRACTS.PRICE_PER_CONSUMPTION');
    labelAddress: string = this._translateService.instant('CB.MY_CONTRACTS.ADDRESS');

    constructor(
        private _cbAlertService: CbAlertService,
        private _translateService: TranslateService,
        private _cbMyContractsService: CbMyContractsService
    ) { }

    ngOnInit() {
        this._setupMyContracts();
    }

    private async _setupMyContracts() {
        this._subscribeToMyContracts();
    }

    ngOnDestroy() {
        this._myContractsSubscription.unsubscribe();
    }

    /** @description Listen for changes to My Contracts Data */
    private _subscribeToMyContracts() {
        this._myContractsSubscription = this._cbMyContractsService.myContracts.subscribe(myContracts => {
            this.myContracts = myContracts;
        });
    }

    openInformationPopup(textToDisplay: string, title: string) {
        this._cbAlertService.showAlert(
            CbAlertHelpers.myContractInfoAlert,
            title,
            textToDisplay
        ); 
    }
}
