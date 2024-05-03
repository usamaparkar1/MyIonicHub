import { CbCustomerAddressService } from '../../services/customer-address/cb-customer-address.service';
import contractBookerJson from 'src/assets/json-data/projects/contract-booker-data.json';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { ConsultationSteps } from '../../models/cb-consultation-steps';
import { Contract } from '../../models/cb-contract';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/cb-product';
import { ActivatedRoute } from '@angular/router';
import { Sector } from '../../models/cb-sector';

@Component({
  selector: 'app-cb-product-details',
  templateUrl: './cb-product-details.page.html',
  styleUrls: ['./cb-product-details.page.scss'],
})

export class CbProductDetailsPage implements OnInit {

    contract!: Contract;
    sector!: Sector;
    product!: Product;
    productBgImage!: string;
    contractBookerData = contractBookerJson;

    constructor(
        private _route: ActivatedRoute,
        private _cbAlertService: CbAlertService,
        private _appHelperService: AppHelperService,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService,
        private _customerAddressService: CbCustomerAddressService
    ) { }

    ngOnInit() {
        this._setupProductDetails();
    }

    private async _setupProductDetails() {
        this.contract = this._route.snapshot.data['contract'];

        if (!this.contract) {
            this._cbAlertService.showAlertForContractDataNotFound('Contract');
            return;
        }

        if(!this.contract?.selectedSectorId) {
            this._cbAlertService.showAlertForContractDataNotFound('SectorId');
            return;
        } 
        
        if (!this.contract?.selectedProductId) {
            this._cbAlertService.showAlertForContractDataNotFound('ProductId');
            return;
        }

        this._loadProductDataForPage(this.contract.selectedSectorId, this.contract.selectedProductId);
    }

    private _loadProductDataForPage(selectedSectorId: string, selectedProductId: string) {
        const sectorResponse = this._customerAddressService.getSectorBySectorId(selectedSectorId);
        if (sectorResponse) {
            this.sector = sectorResponse;
        } else {
            this._cbAlertService.showAlertForContractDataNotFound('Sector');
            return;
        }
        
        const productResponse = this._customerAddressService.getProductByProductId(selectedProductId);
        if (productResponse) {
            this.product = productResponse;
            this.productBgImage = this.product?.productBannerImage ?? this.contractBookerData.defaultProductBannerImg;
            if (!this.contract.pricePerConsumption) {
                let consumption = this.contract.consumptionPerYearEtHt;
                if (this.sector?.isDoubleTariffEnabled) {
                    consumption += this.contract.consumptionPerYearNt;
                }
                this.contract.pricePerConsumption = consumption * this.product.productPrice;
            }
        } else {
            this._cbAlertService.showAlertForContractDataNotFound('Product');
            return;
        }
    }

    handleConsumptionChangeEventEtHt(data: number, sector: Sector) {
        this.contract.consumptionPerYearEtHt = data ?? 0;
        this.updateProductPricePerConsumption(sector);
    }

    handleConsumptionChangeEventNt(data: number, sector: Sector) {
        this.contract.consumptionPerYearNt = data ?? 0;
        this.updateProductPricePerConsumption(sector);
    }

    updateProductPricePerConsumption(sector: Sector) {
        let updatedConsumption = this.contract.consumptionPerYearEtHt;
        if (sector.isDoubleTariffEnabled) {
            updatedConsumption = this.contract.consumptionPerYearEtHt + this.contract.consumptionPerYearNt;
        }

        this.contract.pricePerConsumption = updatedConsumption * this.product.productPrice;
        this._cbContractService.storeProductDetailsConsumption(this.contract);
    }

    isConsumptionInvalid(): boolean {
        if (this._appHelperService.isNumberInValid(this.contract.consumptionPerYearEtHt) || this.contract.consumptionPerYearEtHt === 0) {
            return true;
        }

        if (this.sector?.isDoubleTariffEnabled && (this._appHelperService.isNumberInValid(this.contract.consumptionPerYearNt) || this.contract.consumptionPerYearNt === 0)) {
            return true;
        }

        return false;
    }

    confirmConsumption() {
        this._cbContractService.storeCurrentRoute(this.contract, ConsultationSteps.shoppingCart);
        this._cbRoutingService.goToCbShoppingCart();
    }
}
