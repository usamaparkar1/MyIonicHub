import { ConsultationSteps } from "./cb-consultation-steps";

export class Contract implements IContract {
    id: string;
    state: string;
    city: string;
    postCode: string
    isPrivateCustomer: boolean;
    company: string | null;
    isSigned: boolean;
    currentRoute: ConsultationSteps;
    selectedSectorId: string | null;
    selectedProductId: string | null;
    consumptionPerYearEtHt: number;
    consumptionPerYearNt: number;
    pricePerConsumption: number;
    contractSignature: string | null;

    constructor(contract: Contract) {
        this.id = contract.id;
        this.state = contract.state;
        this.city = contract.city;
        this.postCode = contract.postCode;
        this.isPrivateCustomer = contract.isPrivateCustomer;
        this.company = contract.company;
        this.isSigned = contract.isSigned;
        this.currentRoute = contract.currentRoute;
        this.selectedSectorId = contract.selectedSectorId;
        this.selectedProductId = contract.selectedProductId;
        this.consumptionPerYearEtHt = contract.consumptionPerYearEtHt;
        this.consumptionPerYearNt = contract.consumptionPerYearNt;
        this.pricePerConsumption = contract.pricePerConsumption;
        this.contractSignature = contract.contractSignature;
    }
}

export interface IContract {
    id: string;
    state: string;
    city: string;
    postCode: string;
    isPrivateCustomer: boolean;
    company: string | null;
    isSigned: boolean;
    currentRoute: ConsultationSteps;
    selectedSectorId: string | null;
    selectedProductId: string | null;
    consumptionPerYearEtHt: number;
    consumptionPerYearNt: number;
    pricePerConsumption: number;
    contractSignature: string | null;
}