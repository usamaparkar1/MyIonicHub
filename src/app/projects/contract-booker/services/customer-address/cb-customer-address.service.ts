import { Product, Sector } from '../../pages/cb-product-selection/cb-product-selection.page';
import contractBookerJson from 'src/assets/json-data/projects/contract-booker-data.json';
import { BehaviorSubject, Observable } from 'rxjs';
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
        const sectors = [
            new Sector({
                sectorId: '1',
                sectorName: 'electricity',
                sectorIcon: this.contractBookerData.electricityIconUrl,
                sectorImage: this.contractBookerData.electricitySvgUrl,
                sectorImageAlt: this.contractBookerData.electricityAltText,
                consumptionPerYearEtHt: 0,
                consumptionPerYearNt: 0
            }),
            new Sector({
                sectorId: '2',
                sectorName: 'gas',
                sectorIcon: this.contractBookerData.gasIconUrl,
                sectorImage: this.contractBookerData.gasSvgUrl,
                sectorImageAlt: this.contractBookerData.gasAltText,
                consumptionPerYearEtHt: 0,
                consumptionPerYearNt: 0
            }),
        ];

        this.sectorsSubject.next(sectors);
    }

    getAvailableProductsForSector(): Product[] {
        return [
            {
                productId: '0',
                name: 'Product A',
                productImage: '',
            },
            {
                productId: '1',
                name: 'Product B',
                productImage: '',
            },
            {
                productId: '2',
                name: 'Product C',
                productImage: '',
            },
            {
                productId: '3',
                name: 'Product D',
                productImage: '',
            },
            {
                productId: '4',
                name: 'Product E',
                productImage: '',
            },
            {
                productId: '5',
                name: 'Product F',
                productImage: '',
            },
        ];
    }
}
