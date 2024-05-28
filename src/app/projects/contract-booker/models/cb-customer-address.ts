export class CustomerAddressData implements ICustomerAddressData {
    isNewCustomer:boolean;
    customerNumber: string | null;
    isPrivateCustomer: boolean;
    company: string | null;
    state: string;
    city: string;
    postCode: string

    constructor(customerAddressData: CustomerAddressData) {
        this.isNewCustomer = customerAddressData.isNewCustomer;
        this.customerNumber = customerAddressData.customerNumber;
        this.isPrivateCustomer = customerAddressData.isPrivateCustomer;
        this.company = customerAddressData.company;
        this.state = customerAddressData.state;
        this.city = customerAddressData.city;
        this.postCode = customerAddressData.postCode;
    }
}

export interface ICustomerAddressData {
    isNewCustomer:boolean;
    customerNumber: string | null;
    isPrivateCustomer: boolean;
    company: string | null;
    state: string;
    city: string;
    postCode: string
}