export class CustomerAddressData implements ICustomerAddressData {
    state: string;
    city: string;
    postCode: string
    isPrivateCustomer: boolean;
    company: string | null;

    constructor(customerAddressData: CustomerAddressData) {
        this.state = customerAddressData.state;
        this.city = customerAddressData.city;
        this.postCode = customerAddressData.postCode;
        this.isPrivateCustomer = customerAddressData.isPrivateCustomer;
        this.company = customerAddressData.company;
    }
}

export interface ICustomerAddressData {
    state: string;
    city: string;
    postCode: string
    isPrivateCustomer: boolean;
    company: string | null;
}