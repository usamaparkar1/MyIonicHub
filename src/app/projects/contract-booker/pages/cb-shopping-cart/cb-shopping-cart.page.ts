import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { ConsultationSteps } from '../../models/cb-consultation-steps';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contract } from '../../models/cb-contract';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cb-shopping-cart',
  templateUrl: './cb-shopping-cart.page.html',
  styleUrls: ['./cb-shopping-cart.page.scss'],
})

export class CbShoppingCartPage implements OnInit, OnDestroy {

    contracts: Contract[] = [];
    contractsSubscription!: Subscription;

    constructor(
        private _cbAlertService: CbAlertService,
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

    isSignatureButtonHidden() {
        return this.contracts.length === 0 || this.allContractsAreSigned();
    }

    allContractsAreSigned(): boolean {
        return this.contracts?.length > 0 && this.contracts.every((c) => c.isSigned === true);
    }

    canAddMoreContracts() {
        return this.contracts?.length > 0;
    }

    addContract() {
        this._cbRoutingService.goToCbAddContract();
    }

    /** @description Navigate to PDF Signature Page to sign the contract */
    signContract() {
        const contract = this._cbContractService.getFirstUnSignedContract();

        if (contract) {
            if (contract?.id) {
                this._cbContractService.storeCurrentRoute(contract, ConsultationSteps.signContract);
                this._cbRoutingService.goToCbSignContract(contract?.id, {});
            } else {
                this._cbAlertService.showAlertForContractDataNotFound('ContractId');
            }
        } else {
            this._cbAlertService.showAlertForContractDataNotFound('Contract');
        }
    }

    submitContracts() {

    }
}
