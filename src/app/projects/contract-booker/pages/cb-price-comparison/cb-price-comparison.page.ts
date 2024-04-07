import { CbCustomerAddressService } from '../../services/customer-address/cb-customer-address.service';
import { IProduct, ISector, Product, Sector } from '../cb-product-selection/cb-product-selection.page';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbToastService } from '../../services/toast/cb-toast.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-price-comparison',
  templateUrl: './cb-price-comparison.page.html',
  styleUrls: ['./cb-price-comparison.page.scss'],
})

export class CbPriceComparisonPage implements OnInit {

    sectorsCheckboxes: SectorCheckboxes[] = [];
    products: ProductCheckboxes[] = [];
    selectedProductId!: string;

    constructor(
        private _cbToastService: CbToastService,
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
                consumptionPerYearEtHt: sector.consumptionPerYearEtHt,
                consumptionPerYearNt: sector.consumptionPerYearNt,
                isDoubleTariffEnabled: sector.isDoubleTariffEnabled,
                productCheckboxes: this._getProductsForSector(sector)
            }));
        }
    }

    sectorClicked(sector: SectorCheckboxes) {
        this._getProductsForSector(sector);
        this.updateProductPricePerConsumption(sector);
    }

    private _getProductsForSector(sector: Sector): ProductCheckboxes[] {
        const products = this._cbCustomerAddressService.getAvailableProductsForSector(sector.sectorId);
        return products.map((prod) => new ProductCheckboxes({
            name: prod.name,
            productId: prod.productId,
            productGroupId: prod.productGroupId,
            productImage: prod.productImage,
            checked: false,
            productPrice: prod.productPrice,
            pricePerConsumption: prod.productPrice * (sector?.isDoubleTariffEnabled ? sector.consumptionPerYearEtHt + sector.consumptionPerYearNt : sector.consumptionPerYearEtHt),
        }));
    }

    async productClicked(sector: SectorCheckboxes, product: Product) {
        this._cbContractService.storeContractSector(sector);
        this._cbContractService.storeContractProduct(product);
        this._cbRoutingService.goToProductDetails();
    }

    handleConsumptionChangeEventEtHt(data: number, sector: SectorCheckboxes) {
        sector.consumptionPerYearEtHt = data ?? 0;
        this.updateProductPricePerConsumption(sector);

    }

    handleConsumptionChangeEventNt(data: number, sector: SectorCheckboxes){
        sector.consumptionPerYearNt = data ?? 0;    
        this.updateProductPricePerConsumption(sector);
    }

    updateProductPricePerConsumption(sector: SectorCheckboxes) {
        let updatedConsumption = sector.consumptionPerYearEtHt;
        if (sector.isDoubleTariffEnabled) {
            updatedConsumption = sector.consumptionPerYearEtHt + sector.consumptionPerYearNt;
        }

        sector.productCheckboxes.map((product) => {
            product.pricePerConsumption = updatedConsumption * product.productPrice;
        });
    }

    isConsumptionInValid(selectedProductId: string): boolean {
        const selectedSector = this.sectorsCheckboxes.find(sector => {
            return sector.productCheckboxes.some(product => product.productId === selectedProductId && (product.productGroupId === sector.sectorId));
        });

        if (!selectedSector) {
            return true;
        } else {
            return (selectedSector.consumptionPerYearEtHt === 0 || (selectedSector.isDoubleTariffEnabled ? selectedSector.consumptionPerYearNt === 0 : false));
        }
    }

    validateProductPriceComparison() {
        this._confirmProductSelection();
    }

    private _confirmProductSelection() {
        const selectedProduct = this._cbCustomerAddressService.getProductByProductId(this.selectedProductId);
        if (!selectedProduct) {
            this._cbToastService.showToast({
                header: 'Product could not be found',
                message: 'Please go back and try again. Close the app and try again. Or start a new contract'
            });
            return;
        }

        this._cbContractService.storeContractProduct(selectedProduct);
        this._cbRoutingService.goToProductDetails();
    }
}

export class SectorCheckboxes extends Sector implements ISectorCheckboxes {
    checked: boolean;
    productCheckboxes: ProductCheckboxes[];

    constructor(sectorCheckboxes: ISectorCheckboxes) {
        super(sectorCheckboxes);
        this.checked = sectorCheckboxes.checked;
        this.productCheckboxes = sectorCheckboxes.productCheckboxes;
    }
}

export interface ISectorCheckboxes extends ISector {
    checked: boolean;
    productCheckboxes: ProductCheckboxes[];
}

export class ProductCheckboxes extends Product implements IProductCheckboxes {
    checked: boolean;
    pricePerConsumption: number;

    constructor(productCheckboxes: IProductCheckboxes) {
        super(productCheckboxes);
        this.checked = productCheckboxes.checked;
        this.pricePerConsumption = productCheckboxes.pricePerConsumption;
    }
}

export interface IProductCheckboxes extends IProduct {
    checked: boolean;
    pricePerConsumption: number;
}