import { CbCustomerAddressService } from '../../services/customer-address/cb-customer-address.service';
import contractBookerJson from 'src/assets/json-data/projects/contract-booker-data.json';
import { Product, Sector } from '../cb-product-selection/cb-product-selection.page';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-standard-consultation',
  templateUrl: './cb-standard-consultation.page.html',
  styleUrls: ['./cb-standard-consultation.page.scss'],
})

export class CbStandardConsultationPage implements OnInit {

    contractBookerData = contractBookerJson;
    sectors: Sector[] = [];
    products: Product[] = [];
    selectedSector: Sector | undefined;
    selectedProduct: Product | undefined;

    constructor(
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService,
        private _cbCustomerAddressService: CbCustomerAddressService
    ) { }

    ngOnInit() {
        this._setupProductSelectionPage();
    }

    private async _setupProductSelectionPage() {
        await this._getAvailableSectors();
    }

    /** @description This will get all available sectors for a particular location. */
    private async _getAvailableSectors() {
        this._cbCustomerAddressService.sectors$.subscribe((data) => {
            this.sectors = data;
        });
    }

    sectorClicked(sector: Sector) {
        this.selectedSector = sector;
        this._cbContractService.storeContractSector(sector);
        this._getProductsForSector();
    }

    private async _getProductsForSector() {
        this.products = await this._cbCustomerAddressService.getAvailableProductsForSector();
    }

    async productClicked(product: Product) {
        this._cbContractService.storeContractProduct(product);
        this._cbRoutingService.goToProductDetails();
    }
}
