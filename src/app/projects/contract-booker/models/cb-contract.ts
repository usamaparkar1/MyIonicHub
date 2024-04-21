import { ConsultationSteps } from "./cb-consultation-steps";

export class Contract implements IContract {
    id: string;
    state: string;
    city: string;
    postCode: string
    currentRoute: ConsultationSteps;
    selectedSectorId?: string;
    selectedProductId?: string;
    consumptionPerYearEtHt: number;
    consumptionPerYearNt: number;
    pricePerConsumption: number;

    constructor(contract: Contract) {
        this.id = contract.id;
        this.state = contract.state;
        this.city = contract.city;
        this.postCode = contract.postCode;
        this.currentRoute = contract.currentRoute;
        this.consumptionPerYearEtHt = contract.consumptionPerYearEtHt;
        this.consumptionPerYearNt = contract.consumptionPerYearNt;
        this.pricePerConsumption = contract.pricePerConsumption;
    }
}

export interface IContract {
    id: string;
    state: string;
    city: string;
    postCode: string;
    currentRoute: ConsultationSteps;
    selectedSectorId?: string;
    selectedProductId?: string;
    consumptionPerYearEtHt: number;
    consumptionPerYearNt: number;
    pricePerConsumption: number;
}