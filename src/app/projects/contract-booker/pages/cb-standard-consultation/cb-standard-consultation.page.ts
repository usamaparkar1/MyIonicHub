import { CbCustomerAddressService } from '../../services/customer-address/cb-customer-address.service';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/cb-product';
import { ActivatedRoute } from '@angular/router';
import { Sector } from '../../models/cb-sector';

@Component({
    selector: 'app-cb-standard-consultation',
    templateUrl: './cb-standard-consultation.page.html',
    styleUrls: ['./cb-standard-consultation.page.scss'],
    standalone: false
})

export class CbStandardConsultationPage implements OnInit {

    contract!: Contract;
    sectors: Sector[] = [];
    products: Product[] = [];
    selectedSector!: Sector;

    constructor(
        private _route: ActivatedRoute,
        private _cbAlertService: CbAlertService,
        private _translateService: TranslateService,
        private _cbRoutingService: CbRoutingService,
        private _appHelperService: AppHelperService,
        private _cbContractService: CbContractService,
        private _cbCustomerAddressService: CbCustomerAddressService
    ) { }

    ngOnInit() {
        this._setupProductSelectionPage();
    }

    getColumnClass(): string {
        return this._appHelperService.isScreenSmall() ? '6' : '4';
    }

    private async _setupProductSelectionPage() {
        this.contract = this._route.snapshot.data['contract'];
        await this._getAvailableSectors();
    }

    /** @description This will get all available sectors for a particular location. */
    private async _getAvailableSectors() {
        this._cbCustomerAddressService.sectors$.subscribe((data) => {
            this.sectors = data;
        });

        if (this.sectors?.length > 0) {
            this.sectorClicked(this.sectors[0]);
        } else {
            this._cbAlertService.showAlert(
                CbAlertHelpers.sectorstNotFound,
                this._translateService.instant('CB.PRODUCT_SELECTION.SECTORS_NOT_FOUND'),
                this._translateService.instant('CB.PRODUCT_SELECTION.NO_SECTORS_FOR_ZIP_CITY'),
            );
        }
    }

    sectorClicked(selectedSector: Sector) {
        this.selectedSector = selectedSector;
        this._getProductsForSector(selectedSector.sectorId);
    }

    private async _getProductsForSector(sectorId: string) {
        this.products = await this._cbCustomerAddressService.getAvailableProductsForSector(sectorId);
    }

    async productClicked(productId: string, productName: string) {
        this._setConsumptionValues();
        this._cbContractService.storeStandardProductConsumption(
            this.contract,
            productId,
            productName,
            this.selectedSector.sectorId,
            this.selectedSector.sectorName,
            this.contract.consumptionPerYearEtHt,
            this.contract.consumptionPerYearNt
        );
        this._cbRoutingService.goToCbProductDetails(this.contract.id);
    }

    private _setConsumptionValues() {
        if (this.contract.consumptionPerYearEtHt === 0 || this.contract.consumptionPerYearNt === 0) {
            const defaulConsumptionValue = this.selectedSector.defaultConsumptionValue;

            if (defaulConsumptionValue) {
                if (!this.contract.consumptionPerYearEtHt) {
                    this.contract.consumptionPerYearEtHt = defaulConsumptionValue;
                }
            }

            if (this.selectedSector?.isDoubleTariffEnabled && defaulConsumptionValue) {
                if (!this.contract.consumptionPerYearNt) {
                    this.contract.consumptionPerYearNt = defaulConsumptionValue;
                }
            } else {
                this.contract.consumptionPerYearNt = 0;
            }
        }
    }
}
