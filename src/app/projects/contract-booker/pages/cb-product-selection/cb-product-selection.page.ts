import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { CbCustomerAddressService } from '../../services/customer-address/cb-customer-address.service';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbToastService } from '../../services/toast/cb-toast.service';
import { cbToastHelpers } from '../../helpers/cb-toast-helpers';
import { Contract } from '../../models/cb-contract';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cb-product-selection',
  templateUrl: './cb-product-selection.page.html',
  styleUrls: ['./cb-product-selection.page.scss'],
})

export class CbProductSelectionPage implements OnInit {

    contract!: Contract;
    standardConsultation: string = "standardConsultation";
    priceComparison: string = "priceComparison";
    contractBookerData = contractBookerJson;
    consultationType!: string;
    
    constructor(
        private _route: ActivatedRoute,
        private _cbToastService: CbToastService,
        private _cbRoutingService: CbRoutingService,
        private _appHelperService: AppHelperService,
        private _cbCustomerAddressService: CbCustomerAddressService,
    ) {}

    ngOnInit() {
        this._setupProductSelectionPage();
    }

    private async _setupProductSelectionPage() {
        this.contract = this._route.snapshot.data['contract'];

        if (
            this._appHelperService.isStringNotEmpty(this.contract?.state)
            &&
            this._appHelperService.isStringNotEmpty(this.contract?.city)
            &&
            this._appHelperService.isStringNotEmpty(this.contract?.postCode)
        ) {
            this._cbCustomerAddressService.loadSectorsForZipCity(this.contract.id);
        } else {
            this._handleContractDataNotAvailable();
        }
    }

    private async _handleContractDataNotAvailable() {
        // Buttons needed to be added to clear contract data and send back to home page
        await this._cbToastService.showToast({
            id: cbToastHelpers.contractDataNotAvailableToast,
            header: 'Data not available',
            message: 'Contract data could not be found. Please go back to home page'
        });
    }

    async consultationMethodClicked(consultationRoute: string) {
        this.consultationType = consultationRoute;

        if (this.consultationType === this.standardConsultation) {
            // Standard Consultation
            this._cbRoutingService.goToCbStandardConsultation(this.contract.id);
        } else {
            // Price Comparison
            this._cbRoutingService.goToCbPriceComparison(this.contract.id);
        }
    }
}