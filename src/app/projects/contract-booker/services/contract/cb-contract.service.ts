import { CustomerAddressData } from 'src/app/projects/contract-booker/pages/cb-customer-address/cb-customer-address.page';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ConsultationSteps } from '../../models/cb-consultation-steps';
import { cbStorageHelpers } from 'src/app/helpers/storage-helpers';
import { CbReturnStatus } from '../../models/cb-return-status';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class CbContractService {

    contracts: BehaviorSubject<Contract[]> = new BehaviorSubject<Contract[]>([]);

    constructor(
        private _storageService: StorageService,
        private _translateService: TranslateService
    ) {}

    async clearCartContractStorageKeys() {
        this._clearAllContracts();
    }

    private async _clearAllContracts() {
        this.contracts.next([]);
        this._storageService.remove(cbStorageHelpers.allContracts);
    }

    async getAllContractsFromStorage() {
        return await this._storageService.get(cbStorageHelpers.allContracts);
    }

    async loadAllContractsFromStorage(): Promise<Contract[]> {
        const data = await this.getAllContractsFromStorage();
        if (data?.length > 0) {
            this.contracts.next(data);
        }

        return this.allContracts;
    }

    /** @description Create a copy of the contracts using spread syntax for immutability */
    get allContracts(): Contract[] {
        return [...this.contracts.getValue()];
    }

    storeCurrentRoute(contract: Contract, route: ConsultationSteps) {
        contract.currentRoute = route;
        this.updateContractInConsultation(contract);
    }

    async createNewContract(newCustomerAddressData: CustomerAddressData) {
        const newContractId: string = this._getNewContractId();

        const newContract = new Contract({
            id: newContractId,
            state: newCustomerAddressData.state,
            city: newCustomerAddressData.city,
            postCode: newCustomerAddressData.postCode,
            isSigned: false,
            currentRoute: ConsultationSteps.productSelection,
            selectedSectorId: null,
            selectedProductId: null,
            consumptionPerYearEtHt: 0,
            consumptionPerYearNt: 0,
            pricePerConsumption: 0,
            contractSignature: null
        });

        await this._addNewContractToStorage(newContract);

        return newContract;
    }

    async createContractFromExistingContract(contract: Contract, newCustomerAddressData: CustomerAddressData) {
        const newContract = Object.assign({}, contract);

        newContract.id = this._getNewContractId();
        newContract.state = newCustomerAddressData.state;
        newContract.city = newCustomerAddressData.city;
        newContract.postCode = newCustomerAddressData.postCode;

        await this._addNewContractToStorage(newContract);

        return newContract;
    }

    private _getNewContractId(): string {
        let newContractId: string;
    
        if (this.allContracts?.length > 0) {
            let contractIdExists: boolean;
            do {
                newContractId = uuidv4(); // Generate a new UUID
                // Check if any contract already has this ID
                contractIdExists = this.allContracts.some(contract => contract.id === newContractId);
            } while (contractIdExists); // Continue generating until unique ID found
        } else {
            // If contracts array is empty, generate a new UUID directly
            newContractId = uuidv4();
        }
        
        return newContractId;
    }

    private async _addNewContractToStorage(newContract: Contract) {
        await this.contracts.next([...this.contracts.getValue(), newContract]);
    }

    public async removeContractOnCartDelete(contract: Contract): Promise<CbReturnStatus> {
        const cbReturnStatus = new CbReturnStatus({
            success: false,
            message: this._translateService.instant('CB.CONTRACT.CANT_REMOVE_CONTRACT', {
                contractId: contract.id,
                error: JSON.stringify(contract)  
            })
        });

        try {
            const indexToRemove = this.allContracts.findIndex((c) => c.id === contract.id);

            if (indexToRemove >= 0) {
                const updatedContracts = this.allContracts.filter((_, index) => index !== indexToRemove);
                this.contracts.next(updatedContracts);
                await this.storeContractsInStorage(this.allContracts);
    
                cbReturnStatus.success = true;
                cbReturnStatus.message = this._translateService.instant('CB.CONTRACT.CONTRACT_REMOVED');
            } else {
                cbReturnStatus.message = this._translateService.instant('CB.CONTRACT.CONTRACT_NOT_FOUND')
            }
        } catch (error) {
            cbReturnStatus.message = this._translateService.instant('CB.CONTRACT.CANT_REMOVE_CONTRACT', {
                contractId: contract.id,
                error: `Error: ${JSON.stringify(contract)} ${error}`
            });
        }

        return cbReturnStatus;
    }

    private async storeContractsInStorage(contracts: Contract[]) {
        await this._storageService.set(cbStorageHelpers.allContracts, contracts);
    }

    getContractById(contractId: string): Contract | undefined {
        if (contractId) {
            const contract = this.allContracts.find((x) => x.id === contractId);
            return contract ?? undefined;
        }

        return undefined;
    }

    getLastUsedContract(): Contract {
        return this.allContracts?.slice(-1)[0];
    }

    storeStandardProductConsumption(contract: Contract, productId: string, sectorId: string, consumptionPerYearEtHt: number, consumptionPerYearNt: number) {
        if (contract?.id) {
            contract.selectedSectorId = sectorId;
            contract.selectedProductId = productId;
            contract.consumptionPerYearEtHt = consumptionPerYearEtHt;
            contract.consumptionPerYearNt = consumptionPerYearNt;
            contract.currentRoute = ConsultationSteps.productDetails;
        }

        this.updateContractInConsultation(contract);
    }

    storeComparisonProductConsumption(contract: Contract, productId: string, sectorId: string, consumptionPerYearEtHt: number, consumptionPerYearNt: number) {
        if (contract?.id) {
            contract.selectedSectorId = sectorId;
            contract.selectedProductId = productId;
            contract.consumptionPerYearEtHt = consumptionPerYearEtHt;
            contract.consumptionPerYearNt = consumptionPerYearNt;
            contract.currentRoute = ConsultationSteps.productDetails;
        }

        this.updateContractInConsultation(contract);
    }

    storeProductDetailsConsumption(contract: Contract) {
        this.updateContractInConsultation(contract);
    }

    updateContractsWithContract(newContract: Contract): Contract[] {
        const indexToUpdate = this.allContracts.findIndex(contract => contract.id === newContract.id);

        const updatedContracts = this.allContracts.map((contract, index) => {
            if (index === indexToUpdate) {
                return newContract;
            }
            return contract;
        });

        return updatedContracts;
    }

    getFirstUnSignedContract(): Contract | undefined {
        const contract = this.allContracts.find((ac) => ac.isSigned === false);
        return contract ?? undefined;
    }

    storeContractSignature(contract: Contract, signature: string) {
        contract.isSigned = true;
        contract.contractSignature = signature;
        contract.currentRoute = ConsultationSteps.shoppingCart;
        this.updateContractInConsultation(contract);
    }

    updateContractInConsultation(contract: Contract) {
        const newContractsArray = this.updateContractsWithContract(contract);
        this.contracts.next(newContractsArray);
        this.storeContractsInStorage(this.allContracts);
    }
}