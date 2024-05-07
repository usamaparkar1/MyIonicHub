import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/cb-product';
import { Sector } from '../../models/cb-sector';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CbCustomerAddressService {

    sectorsSubject: BehaviorSubject<Sector[]> = new BehaviorSubject<Sector[]>([]);
    sectors$: Observable<Sector[]> = this.sectorsSubject.asObservable();
    contractBookerData = contractBookerJson;

    constructor() { }

    /** @description This will load and store the sectors to be used in Standard and Price Comparison Consultation */
    loadSectorsForZipCity(contractId: string) {
        const sectors = this.contractBookerData.sectors.map((sector) => new Sector({
            sectorId: sector.sectorId,
            sectorName: sector.sectorName,
            sectorIcon: sector.sectorIcon,
            sectorImage: sector.sectorImage,
            sectorImageAlt: sector.sectorImageAlt,
            minConsumption: sector.minConsumption,
            maxConsumption: sector.maxConsumption,
            defaultConsumptionValue: sector.defaultConsumptionValue,
            isDoubleTariffEnabled: sector.isDoubleTariffEnabled,
        }));

        this.sectorsSubject.next(sectors);
    }

    getAvailableProductsForSector(sectorId: string): Product[] {
        return this.contractBookerData.products.filter((product) => product.productGroupId === sectorId);
    }

    getSectorBySectorId(sectorId: string): Sector | undefined {
        return this.contractBookerData.sectors.find((sector) => sector.sectorId === sectorId);
    }

    getProductByProductId(selectedProductId: string): Product | undefined {
        return this.contractBookerData.products.find((product) => product.productId === selectedProductId);
    }
}
