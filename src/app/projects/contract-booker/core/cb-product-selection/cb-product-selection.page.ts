import contractBookerJson from 'src/assets/json-data/contract-booker-data.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-product-selection',
  templateUrl: './cb-product-selection.page.html',
  styleUrls: ['./cb-product-selection.page.scss'],
})
export class CbProductSelectionPage implements OnInit {

    contractBookerData = contractBookerJson;
    selectedSector!: Sector;
    sectors!: Sector[];

    products = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ];

    constructor() {}

    ngOnInit() {
        this._productSelectionInit();
    }

    private async _productSelectionInit() {
        await this._getAvailableSectors();
    }

    /** @description This will get all available sectors for a particular location. */
    private async _getAvailableSectors() {
        this.sectors = [
            new Sector({
                sectorId: 1,
                sectorName: 'electricity',
                sectorImage: this.contractBookerData.electricitySvgUrl,
                sectorImageAlt: this.contractBookerData.electricityAltText,
            }),
            new Sector({
                sectorId: 2,
                sectorName: 'gas',
                sectorImage: this.contractBookerData.gasSvgUrl,
                sectorImageAlt: this.contractBookerData.gasAltText,
            }),
        ]
    }

    sectorClicked(sector: Sector) {
        this.selectedSector = sector;
    }
}

export class Sector implements ISector {
    sectorId: number;
    sectorName: string;
    sectorImage: string;
    sectorImageAlt: string;

    constructor (sector: Sector) {
        this.sectorId = sector.sectorId;
        this.sectorName = sector.sectorName;
        this.sectorImage = sector.sectorImage;
        this.sectorImageAlt = sector.sectorImageAlt;
    }
}

export interface ISector {
    sectorId: number;
    sectorName: string;
    sectorImage: string;
    sectorImageAlt: string;
}