import { CbContractService } from 'src/app/projects/contract-booker/services/contract/cb-contract.service';
import { CbModalService } from 'src/app/projects/contract-booker/services/modal/cb-modal.service';
import { customerAddressHelpers } from 'src/app/helpers/contract-booker/customer-address-helpers';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import citiesListJson from 'src/assets/json-data/cities.json';
import stateListJson from 'src/assets/json-data/states.json';
import { Component, OnInit } from '@angular/core';
import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';

@Component({
  selector: 'app-cb-customer-address',
  templateUrl: './cb-customer-address.page.html',
  styleUrls: ['./cb-customer-address.page.scss'],
})

export class CbCustomerAddressPage implements OnInit {

    isValidatingCustomerAddressForm: boolean = false;
    customerAddressFormHelpers = customerAddressHelpers;
    customerAddressForm: UntypedFormGroup = new UntypedFormBuilder().group({
        state: ['Maharashtra', Validators.compose([Validators.required])],
        city: ['Mumbai', Validators.compose([Validators.required])],
        postCode: ['400009', Validators.compose([
            Validators.required,
            Validators.minLength(customerAddressHelpers.postCodeMinLength),
            Validators.maxLength(customerAddressHelpers.postCodeMaxLength)]
        )],
    });

    constructor(
        private _cbContractService: CbContractService,
        private _cbRoutingService: CbRoutingService,
        private _cbModalService: CbModalService
    ) {}

    ngOnInit() {
    }

    async openStateSearchBar() {
        const searchBarModal = await this._cbModalService.openStateSearchBarModal(stateListJson);

        await searchBarModal.present();

        const { data, role } = await searchBarModal.onWillDismiss();
        if (role === 'confirm') {
            this.customerAddressForm.get('state')?.setValue(data);
            this.customerAddressForm.get('city')?.setValue(null);
        }
    }

    async openCitiesSearchBar() {
        if (this.customerAddressForm.get('state')!.invalid) {
            return;
        }

        const cityList = this._getCitiesFilteredByState();
        const searchBarModal = await this._cbModalService.openCitySearchBarModal(cityList);

        await searchBarModal.present();

        const { data, role } = await searchBarModal.onWillDismiss();
        if (role === 'confirm') {
            this.customerAddressForm.get('city')?.setValue(data);
        }
    }

    private _getCitiesFilteredByState() {
        const selectedState = this.customerAddressForm.get('state')?.value;
        return (citiesListJson as any)[selectedState];
    }

    async validateCustomerAddress() {
        try {
            this._showValidatingFormLoader(true);
            const newCustomerAddressData = new CustomerAddressData({
                state: this.customerAddressForm.get('state')?.value,
                city: this.customerAddressForm.get('city')?.value,
                postCode: this.customerAddressForm.get('postCode')?.value
            });

            await this._cbContractService.createNewContract(newCustomerAddressData)
            this._showValidatingFormLoader(false);
            this._goToProductSelection();
        } catch (error) {
            this._showValidatingFormLoader(false);
        }
    }

    private _showValidatingFormLoader(value: boolean) {
        this.isValidatingCustomerAddressForm = value;
    }

    private _goToProductSelection() {
        this._cbRoutingService.goToCbProductSelection();
    }
}
export class CustomerAddressData implements ICustomerAddressData {
    state: string;
    city: string;
    postCode: string

    constructor(customerAddressData: CustomerAddressData) {
        this.state = customerAddressData.state;
        this.city = customerAddressData.city;
        this.postCode = customerAddressData.postCode;
    }
}

export interface ICustomerAddressData {
    state: string;
    city: string;
    postCode: string
}