export class Product implements IProduct {
    name: string;
    productId: string
    productGroupId: string;
    productImage: string | null | undefined;
    productBannerImage: string | null | undefined;
    productPrice: number;
    productPricePerConsumption: number;
    keySellingPoints?: string[];

    constructor(product: Product) {
        this.name = product.name;
        this.productId = product.productId;
        this.productGroupId = product.productGroupId;
        this.productImage = product.productImage;
        this.productPrice = product.productPrice;
        this.productBannerImage = product.productBannerImage;
        this.productPricePerConsumption = product.productPricePerConsumption;
        this.keySellingPoints = product.keySellingPoints;
    }
}

export interface IProduct {
    name: string;
    productId: string;
    productGroupId: string;
    productImage: string | null | undefined;
    productBannerImage: string | null | undefined;
    productPrice: number;
    productPricePerConsumption: number;
    keySellingPoints?: string[];
}