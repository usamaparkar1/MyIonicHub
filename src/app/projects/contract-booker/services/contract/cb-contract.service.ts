import { CustomerAddressData } from 'src/app/projects/contract-booker/pages/cb-customer-address/cb-customer-address.page';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ConsultationSteps } from '../../models/cb-consultation-steps';
import { cbStorageHelpers } from 'src/app/helpers/storage-helpers';
import { Contract } from '../../models/cb-contract';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class CbContractService {

    contracts: Contract[] = []; // Check For optmization

    constructor(
        private _storageService: StorageService
    ) {}

    async clearAllContractStorageKeys() {
        this._clearAllContracts();
    }

    private async _clearAllContracts() {
        this.contracts = [];
        this._storageService.remove(cbStorageHelpers.allContracts);
    }

    async getAllContractsFromStorage() {
        return await this._storageService.get(cbStorageHelpers.allContracts);
    }

    async loadAllContractsFromStorage(): Promise<Contract[]> {
        const data = await this.getAllContractsFromStorage();
        if (data?.length > 0) {
            this.contracts = data;
        }

        return this.contracts;
    }

    storeCurrentRoute(contract: Contract, route: ConsultationSteps) {
        contract.currentRoute = route;
        this.contracts = this.updateContractsWithContract(contract);
        this.storeContractsInStorage(this.contracts);
    }

    async createNewContract(newCustomerAddressData: CustomerAddressData) {
        const newContractId: string = this._getNewContractId();

        const newContract = new Contract({
            id: newContractId,
            state: newCustomerAddressData.state,
            city: newCustomerAddressData.city,
            postCode: newCustomerAddressData.postCode,
            currentRoute: ConsultationSteps.productSelection,
            consumptionPerYearEtHt: 0,
            consumptionPerYearNt: 0,
            pricePerConsumption: 0
        });

        this.contracts.push(newContract);
        await this.storeContractsInStorage(this.contracts);

        return newContract;
    }

    private _getNewContractId(): string {
        let newContractId: string;
    
        if (this.contracts?.length > 0) {
            let contractIdExists: boolean;
            do {
                newContractId = uuidv4(); // Generate a new UUID
                // Check if any contract already has this ID
                contractIdExists = this.contracts.some(contract => contract.id === newContractId);
            } while (contractIdExists); // Continue generating until unique ID found
        } else {
            // If contracts array is empty, generate a new UUID directly
            newContractId = uuidv4();
        }
        
        return newContractId;
    }

    async storeContractsInStorage(contracts: Contract[]) {
        await this._storageService.set(cbStorageHelpers.allContracts, contracts);
    }

    getContractById(contractId: string): Contract | undefined {
        const contract = this.contracts.find((x) => x.id === contractId);
        return contract !== undefined ? contract : undefined;
    }

    getLastUsedContract(): Contract {
        return this.contracts?.slice(-1)[0];
    }

    storeStandardProductConsumption(productId: string, sectorId: string, consumptionPerYearEtHt: number, consumptionPerYearNt: number) {
        const contract = this.getLastUsedContract();

        if (contract?.id) {
            contract.selectedSectorId = sectorId;
            contract.selectedProductId = productId;
            contract.consumptionPerYearEtHt = consumptionPerYearEtHt;
            contract.consumptionPerYearNt = consumptionPerYearNt;
        }

        this.contracts = this.updateContractsWithContract(contract);
        this.storeContractsInStorage(this.contracts);
    }


    storeComparisonProductConsumption(contract: Contract, productId: string, sectorId: string, consumptionPerYearEtHt: number, consumptionPerYearNt: number) {
        if (contract?.id) {
            contract.selectedSectorId = sectorId;
            contract.selectedProductId = productId;
            contract.consumptionPerYearEtHt = consumptionPerYearEtHt;
            contract.consumptionPerYearNt = consumptionPerYearNt;
        }

        this.contracts = this.updateContractsWithContract(contract);
        this.storeContractsInStorage(this.contracts);
    }

    storeProductDetailsConsumption(contract: Contract) {
        this.contracts = this.updateContractsWithContract(contract);
        this.storeContractsInStorage(this.contracts);
    }

    updateContractsWithContract(newContract: Contract): Contract[] {
        const indexToUpdate = this.contracts.findIndex(contract => contract.id === newContract.id);

        const updatedContracts = this.contracts.map((contract, index) => {
            if (index === indexToUpdate) {
                return newContract;
            }
            return contract;
        });

        return updatedContracts;
    }
}