import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { CbAddContractType } from '../../enums/cb-add-contract-type';
import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cb-add-contract',
    templateUrl: './cb-add-contract.page.html',
    styleUrls: ['./cb-add-contract.page.scss'],
    standalone: false
})

export class CbAddContractPage implements OnInit {

    contracts: Contract[] = [];
    contractsSubscription!: Subscription;
    addContractTypeEnum = CbAddContractType;
    addContractType: CbAddContractType = CbAddContractType.createFromExisting;
    selectedContractId!: string;

    constructor(
        private _cbAlertService: CbAlertService,
        private _translateService: TranslateService,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService
    ) { }

    ngOnInit() {
        this._setupShoppingCart();
    }

    private async _setupShoppingCart() {
        this.contractsSubscription = this._cbContractService.contracts.subscribe(contracts => {
            this.contracts = contracts;
        });    
    }

    ngOnDestroy() {
        this.contractsSubscription.unsubscribe();
    }

    canSeeContractList() {
        return this.addContractType === this.addContractTypeEnum.createFromExisting && this.contracts?.length > 0;
    }

    canAddAnotherContract(): boolean {
        if (this.addContractType) {
            if (this.addContractType === this.addContractTypeEnum.createFromExisting) {
                return this.selectedContractId?.length > 0;
            }

            return true;
        }

        return false;
    }

    addAnotherContract() {
        if (this.addContractType === this.addContractTypeEnum.createFromExisting) {
            if (this.selectedContractId) {
                this._cbRoutingService.goToCbCustomerAddress({queryParams: { contractId: this.selectedContractId }});
            } else {
                this._cbAlertService.showAlert(
                    CbAlertHelpers.newContractIdNotFound,
                    this._translateService.instant('CB.CORE.ERROR'),
                    this._translateService.instant('CB.ADD_CONTRACT.CONTRACT_ID_NOT_FOUND'),
                );
            }
        } else if (this.addContractType === this.addContractTypeEnum.createNewContract) {
            this._cbRoutingService.goToCbCustomerAddress();
        } else {
            this._cbAlertService.showAlert(
                CbAlertHelpers.invalidSelectionForNewContract,
                this._translateService.instant('CB.CORE.ERROR'),
                this._translateService.instant('CB.ADD_CONTRACT.INVALID_SELECTION_FOR_ADD_CONTRACT'),
            )
        }
    }
}
