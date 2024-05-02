import { cbCustomerAddressHelpers } from 'src/app/projects/contract-booker/helpers/cb-customer-address-helpers';
import { CbContractService } from 'src/app/projects/contract-booker/services/contract/cb-contract.service';
import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CbModalService } from 'src/app/projects/contract-booker/services/modal/cb-modal.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { CustomerAddressData } from '../../models/cb-customer-address';
import citiesListJson from 'src/assets/json-data/cities.json';
import stateListJson from 'src/assets/json-data/states.json';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contract } from '../../models/cb-contract';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cb-customer-address',
    templateUrl: './cb-customer-address.page.html',
    styleUrls: ['./cb-customer-address.page.scss'],
})

export class CbCustomerAddressPage implements OnInit, OnDestroy {

    private routeSubscription!: Subscription;

    contract!: Contract;
    isValidatingCustomerAddressForm: boolean = false;
    customerAddressFormHelpers = cbCustomerAddressHelpers;
    customerAddressForm: UntypedFormGroup = new UntypedFormBuilder().group({
        isPrivateCustomer: [true, Validators.required],
        company: ['Parkar&Parkar', this.isCompanyRequiredValidator()],
        state: ['Maharashtra', Validators.compose([Validators.required])],
        city: ['Mumbai', Validators.compose([Validators.required])],
        postCode: ['400009', Validators.compose([
            Validators.required,
            Validators.minLength(cbCustomerAddressHelpers.postCodeMinLength),
            Validators.maxLength(cbCustomerAddressHelpers.postCodeMaxLength)]
        )],
    });

    constructor(
        private _route: ActivatedRoute,
        private _cbAlertService: CbAlertService,
        private _cbModalService: CbModalService,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService,
    ) {
        this._detectFormChanges();
    }

    ngOnInit() {
        this.routeSubscription = this._route.queryParams.subscribe((params) => {
            const existingContractId: string = params['contractId'];
            if (existingContractId?.length > 0) {
                this._setExistingContractAddress(existingContractId);
            }
        });
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }

    private _detectFormChanges() {
        const detectIsPrivateCustomerChanges = () => {
            this.customerAddressForm.get('isPrivateCustomer')?.valueChanges.subscribe(() => {
                this.customerAddressForm.get('company')?.setValidators(this.isCompanyRequiredValidator());
                this.customerAddressForm.get('company')?.updateValueAndValidity();
            });
        }

        detectIsPrivateCustomerChanges();
    }

    isCompanyRequiredValidator() {
        return (control: AbstractControl<any, any>) => {
            const isPrivateCustomerControl = control.parent?.get('isPrivateCustomer');
            if (isPrivateCustomerControl && isPrivateCustomerControl.value === false) {
                return Validators.required(control);
            } else {
                return null;
            }
        };
    }

    private _setExistingContractAddress(existingContractId: string) {
        const contract = this._cbContractService.getContractById(existingContractId);
        if (contract) {
            this._setCustomerAddressFromExistingContract(contract);
        } else {
            this._handleExistingContractDataNotFound(contract);
        }
    }

    private _setCustomerAddressFromExistingContract(existingContract: Contract) {
        this.customerAddressForm.get('state')?.setValue(existingContract.state);
        this.customerAddressForm.get('city')?.setValue(existingContract.city);
        this.customerAddressForm.get('postCode')?.setValue(existingContract.postCode);
        this.customerAddressForm.get('isPrivateCustomer')?.setValue(existingContract.isPrivateCustomer);
        this.customerAddressForm.get('company')?.setValue(existingContract.company);
    }

    private _handleExistingContractDataNotFound(contract: Contract | undefined) {
        if (!contract) {
            this._cbAlertService.showAlertForContractDataNotFound('Contract');
            return;
        }

        const missingProperty = !contract.state ? 'State' : !contract.city ? 'City' : !contract.postCode ? 'PostCode' : (!contract.isPrivateCustomer && !contract?.company) ? 'Company' : null;
        if (missingProperty) {
            this._cbAlertService.showAlertForContractDataNotFound(missingProperty);
            return;
        }
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
            const newCustomerAddressData = this._getNewCustomerAddressData(
                this.customerAddressForm.get('state')?.value,
                this.customerAddressForm.get('city')?.value,
                this.customerAddressForm.get('postCode')?.value,
                this.customerAddressForm.get('isPrivateCustomer')?.value,
                this.customerAddressForm.get('company')?.value
            );

            const isNewContract = !this.contract;
            const newContract = isNewContract 
                ? await this._cbContractService.createNewContract(newCustomerAddressData)
                : await this._cbContractService.createContractFromExistingContract(this.contract, newCustomerAddressData);
            this._showValidatingFormLoader(false);
            this._openProductSelection(newContract);
        } catch (error) {
            this._showValidatingFormLoader(false);
        }
    }

    private _getNewCustomerAddressData(state: string, city: string, postCode: string, isPrivateCustomer: boolean, company: string) {
        return new CustomerAddressData({ state, city, postCode, isPrivateCustomer, company });
    }

    private _showValidatingFormLoader(value: boolean) {
        this.isValidatingCustomerAddressForm = value;
    }

    private _openProductSelection(newContract: Contract) {
        this._cbRoutingService.goToCbProductSelection(newContract.id, {});
    }
}