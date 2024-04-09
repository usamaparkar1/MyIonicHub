import { CbCustomerAddressService } from '../../services/customer-address/cb-customer-address.service';
import { Product, Sector } from '../cb-product-selection/cb-product-selection.page';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-standard-consultation',
  templateUrl: './cb-standard-consultation.page.html',
  styleUrls: ['./cb-standard-consultation.page.scss'],
})

export class CbStandardConsultationPage implements OnInit {

    sectors: Sector[] = [];
    products: Product[] = [];
    selectedSectorId!: string;

    constructor(
        private _cbAlertService: CbAlertService,
        private _translateService: TranslateService,
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

        if (this.sectors?.length > 0) {
            this.selectedSectorId = this.sectors[0].sectorId;
            this.sectorClicked(this.selectedSectorId);
        } else {
            this._cbAlertService.showAlert(
                CbAlertHelpers.sectorstNotFound,
                this._translateService.instant('CB.PRODUCT_SELECTION.SECTORS_NOT_FOUND'),
                this._translateService.instant('CB.PRODUCT_SELECTION.NO_SECTORS_FOR_ZIP_CITY'),
            );
        }
    }

    sectorClicked(sectorId: string) {
        this.selectedSectorId = sectorId;
        this._getProductsForSector(sectorId);
    }

    private async _getProductsForSector(sectorId: string) {
        this.products = await this._cbCustomerAddressService.getAvailableProductsForSector(sectorId);
    }

    async productClicked(productId: string) {
        this._cbContractService.storeContractProduct(productId, this.selectedSectorId);
        this._cbRoutingService.goToProductDetails();
    }
}
