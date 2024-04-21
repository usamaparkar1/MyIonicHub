import { CbCustomerAddressService } from '../../services/customer-address/cb-customer-address.service';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { ProductCheckboxes } from '../../models/cb-product-checkboxes';
import { SectorCheckboxes } from '../../models/cb-sector-checkboxes';
import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sector } from '../../models/cb-sector';

@Component({
  selector: 'app-cb-price-comparison',
  templateUrl: './cb-price-comparison.page.html',
  styleUrls: ['./cb-price-comparison.page.scss'],
})

export class CbPriceComparisonPage implements OnInit {

    contract!: Contract;
    products: ProductCheckboxes[] = [];
    sectorsCheckboxes: SectorCheckboxes[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _cbAlertService: CbAlertService,
        private _cbRoutingService: CbRoutingService,
        private _appHelperService: AppHelperService,
        private _translateService: TranslateService,
        private _cbContractService: CbContractService,
        private _cbCustomerAddressService: CbCustomerAddressService
    ) { }

    ngOnInit() {
        this._setupProductSelectionPage();
    }

    private async _setupProductSelectionPage() {
        this.contract = this._route.snapshot.data['contract'];

        await this._getAvailableSectors();
    }

    /** @description This will get all available sectors for a particular location. */
    private async _getAvailableSectors() {
        this._cbCustomerAddressService.sectors$.subscribe((data) => {
            this._updateSectorsArray(data);
        });
    }

    private _updateSectorsArray(sectorsArray: Sector[]) {
        if (sectorsArray?.length > 0) {
            this.sectorsCheckboxes = sectorsArray.map(sector => new SectorCheckboxes({
                checked: false,
                sectorId: sector.sectorId,
                sectorName: sector.sectorName,
                sectorIcon: sector.sectorIcon,
                sectorImage: sector.sectorImage,
                sectorImageAlt: sector.sectorImageAlt,
                minConsumption: sector.minConsumption,
                maxConsumption: sector.maxConsumption,
                defaultConsumptionValue: sector.defaultConsumptionValue,
                priceComparisonConsumptionPerYearEtHt: sector.defaultConsumptionValue,
                priceComparisonConsumptionPerYearNt: sector.defaultConsumptionValue,
                isDoubleTariffEnabled: sector.isDoubleTariffEnabled,
                productCheckboxes: this._getProductsForSector(sector)
            }));
        }
    }

    sectorClicked(sector: SectorCheckboxes) {
        if (sector.checked) {
            this._getProductsForSector(sector);
            this.updateProductPricePerConsumption(sector);
        }
    }

    private _getProductsForSector(sector: Sector): ProductCheckboxes[] {
        const products = this._cbCustomerAddressService.getAvailableProductsForSector(sector.sectorId);
        return products.map((prod) => new ProductCheckboxes({
            name: prod.name,
            productId: prod.productId,
            productGroupId: prod.productGroupId,
            productImage: prod.productImage,
            productBannerImage: prod.productBannerImage,
            checked: false,
            productPrice: prod.productPrice,
            productPricePerConsumption: prod.productPrice * (sector?.isDoubleTariffEnabled ? sector.defaultConsumptionValue + sector.defaultConsumptionValue : sector.defaultConsumptionValue),
        }));
    }

    handleConsumptionChangeEventEtHt(data: number, sector: SectorCheckboxes) {
        sector.priceComparisonConsumptionPerYearEtHt = data ?? 0;
        this.updateProductPricePerConsumption(sector);
    }

    handleConsumptionChangeEventNt(data: number, sector: SectorCheckboxes){
        sector.priceComparisonConsumptionPerYearNt = data ?? 0;    
        this.updateProductPricePerConsumption(sector);
    }

    updateProductPricePerConsumption(sector: SectorCheckboxes) {
        let updatedConsumption = sector.priceComparisonConsumptionPerYearEtHt ?? 0;
        if (sector.isDoubleTariffEnabled && sector.priceComparisonConsumptionPerYearNt) {
            updatedConsumption += sector.priceComparisonConsumptionPerYearNt ?? 0;
        }

        sector.productCheckboxes.map((product) => {
            product.productPricePerConsumption = updatedConsumption * product.productPrice;
        });
    }

    isConsumptionInvalid(
        selectedProductId: string,
        selectedSectorId: string,
        priceComparisonConsumptionPerYearEtHt:number,
        priceComparisonConsumptionPerYearNt: number,
        isDoubleTariffEnabled: boolean
    ) {
        if (this._appHelperService.isNumberInValid(priceComparisonConsumptionPerYearEtHt) || priceComparisonConsumptionPerYearEtHt === 0) {
            this._cbAlertService.showAlert(
                CbAlertHelpers.InvalidEtHtConsumption,
                this._translateService.instant('CB.CONSUMPTION.INVALID_CONSUMPTION'),
                this._translateService.instant('CB.CONSUMPTION.SELECT_VALID_CONSUMPTION', {
                    consumptionType: 'ET HT'
                })
            );
            return;
        }

        if (isDoubleTariffEnabled && (this._appHelperService.isNumberInValid(priceComparisonConsumptionPerYearNt) || priceComparisonConsumptionPerYearNt === 0)) {
            this._cbAlertService.showAlert(
                CbAlertHelpers.InvalidNtConsumption,
                this._translateService.instant('CB.CONSUMPTION.INVALID_CONSUMPTION'),
                this._translateService.instant('CB.CONSUMPTION.SELECT_VALID_CONSUMPTION', {
                    consumptionType: 'NT'
                })
            );
            return;
        }

        this.confirmProductSelection(selectedProductId, selectedSectorId, priceComparisonConsumptionPerYearEtHt, priceComparisonConsumptionPerYearNt);
    }

    confirmProductSelection(selectedProductId: string, selectedSectorId: string, priceComparisonConsumptionPerYearEtHt: number, priceComparisonConsumptionPerYearNt: number) {
        this._cbContractService.storeComparisonProductConsumption(
            this.contract,
            selectedProductId,
            selectedSectorId,
            priceComparisonConsumptionPerYearEtHt,
            priceComparisonConsumptionPerYearNt
        );
        this._cbRoutingService.goToProductDetails();
    }
}
