import { IProduct, Product } from "./cb-product";

export class ProductCheckboxes extends Product implements IProductCheckboxes {
    checked: boolean;

    constructor(productCheckboxes: IProductCheckboxes) {
        super(productCheckboxes);
        this.checked = productCheckboxes.checked;
    }
}

export interface IProductCheckboxes extends IProduct {
    checked: boolean;
}