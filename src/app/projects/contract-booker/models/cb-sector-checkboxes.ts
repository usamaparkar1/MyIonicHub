import { ProductCheckboxes } from "./cb-product-checkboxes";
import { ISector, Sector } from "./cb-sector";

export class SectorCheckboxes extends Sector implements ISectorCheckboxes {
    checked: boolean;
    priceComparisonConsumptionPerYearEtHt: number;
    priceComparisonConsumptionPerYearNt: number;
    productCheckboxes: ProductCheckboxes[];

    constructor(sectorCheckboxes: ISectorCheckboxes) {
        super(sectorCheckboxes);
        this.checked = sectorCheckboxes.checked;
        this.priceComparisonConsumptionPerYearEtHt = sectorCheckboxes.priceComparisonConsumptionPerYearEtHt;
        this.priceComparisonConsumptionPerYearNt = sectorCheckboxes.priceComparisonConsumptionPerYearNt;
        this.productCheckboxes = sectorCheckboxes.productCheckboxes;
    }
}

export interface ISectorCheckboxes extends ISector {
    checked: boolean;
    priceComparisonConsumptionPerYearEtHt: number;
    priceComparisonConsumptionPerYearNt: number;
    productCheckboxes: ProductCheckboxes[];
}
