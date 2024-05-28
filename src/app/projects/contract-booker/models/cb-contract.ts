import { ConsultationSteps } from "./cb-consultation-steps";

export class Contract implements IContract {
    id: string;
    state: string;
    city: string;
    postCode: string
    isNewCustomer: boolean;
    customerNumber: string | null;
    isPrivateCustomer: boolean;
    company: string | null;
    isSigned: boolean;
    currentRoute: ConsultationSteps;
    selectedSectorId: string | null;
    selectedSectorName: string | null;
    selectedProductId: string | null;
    selectedProductName: string | null;
    consumptionPerYearEtHt: number;
    consumptionPerYearNt: number;
    pricePerConsumption: number;
    contractSignature: string | null;

    constructor(contract: Contract) {
        this.id = contract.id;
        this.state = contract.state;
        this.city = contract.city;
        this.postCode = contract.postCode;
        this.isNewCustomer = contract.isNewCustomer;
        this.customerNumber = contract.customerNumber;
        this.isPrivateCustomer = contract.isPrivateCustomer;
        this.company = contract.company;
        this.isSigned = contract.isSigned;
        this.currentRoute = contract.currentRoute;
        this.selectedSectorId = contract.selectedSectorId;
        this.selectedSectorName = contract.selectedSectorName;
        this.selectedProductId = contract.selectedProductId;
        this.selectedProductName = contract.selectedProductName;
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
    isNewCustomer: boolean;
    customerNumber: string | null;
    isPrivateCustomer: boolean;
    company: string | null;
    isSigned: boolean;
    currentRoute: ConsultationSteps;
    selectedSectorId: string | null;
    selectedSectorName: string | null;
    selectedProductId: string | null;
    selectedProductName: string | null;
    consumptionPerYearEtHt: number;
    consumptionPerYearNt: number;
    pricePerConsumption: number;
    contractSignature: string | null;
}