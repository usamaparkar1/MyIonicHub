import { CustomerAddressData } from 'src/app/widgets/projects/contract-booker/core/cb-customer-address/cb-customer-address.page';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class CbContractService {

    contracts: Contract[] = [];

    constructor() {}

    createNewContract(newCustomerAddressData: CustomerAddressData) {
        const newContractId: string = this._getNewContractId();

        const newContract = new Contract({
            id: newContractId,
            state: newCustomerAddressData.state,
            city: newCustomerAddressData.city,
            postCode: newCustomerAddressData.postCode,
        });

        this.contracts.push(newContract);
    }

    private _getNewContractId(): string {
        let newContractId = uuidv4();

        if (this.contracts?.length > 0) {
            let contractIdExists: boolean = false;
            do {
                contractIdExists = this.contracts.findIndex((x) => x.id === newContractId) >= 0;
                if (contractIdExists) {
                    newContractId = uuidv4();
                }
            } while (contractIdExists);
        }

        return newContractId
    }
}

export class Contract implements IContract {
    id: string;
    state: string;
    city: string;
    postCode: string

    constructor(contract: Contract) {
        this.id = contract.id;
        this.state = contract.state;
        this.city = contract.city;
        this.postCode = contract.postCode;
    }
}

export interface IContract {
    state: string;
    city: string;
    postCode: string
}
