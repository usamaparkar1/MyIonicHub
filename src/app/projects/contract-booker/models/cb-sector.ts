export class Sector implements ISector {
    sectorId: string;
    sectorName: string;
    sectorIcon: string;
    sectorImage: string;
    sectorImageAlt: string;
    minConsumption: number;
    maxConsumption: number;
    defaultConsumptionValue: number;
    isDoubleTariffEnabled: boolean;

    constructor (sector: Sector) {
        this.sectorId = sector.sectorId;
        this.sectorName = sector.sectorName;
        this.sectorIcon = sector.sectorIcon;
        this.sectorImage = sector.sectorImage;
        this.sectorImageAlt = sector.sectorImageAlt;
        this.minConsumption = sector.minConsumption;
        this.maxConsumption = sector.maxConsumption;
        this.defaultConsumptionValue = sector.defaultConsumptionValue;
        this.isDoubleTariffEnabled = sector.isDoubleTariffEnabled;
    }
}

export interface ISector {
    sectorId: string;
    sectorName: string;
    sectorIcon: string;
    sectorImage: string;
    sectorImageAlt: string;
    minConsumption: number;
    maxConsumption: number;
    defaultConsumptionValue: number;
    isDoubleTariffEnabled: boolean;
}