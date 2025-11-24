import { cbCustomerAddressHelpers } from 'src/app/projects/contract-booker/helpers/cb-customer-address-helpers';
import { CbContractService } from 'src/app/projects/contract-booker/services/contract/cb-contract.service';
import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import { CbCustomerAddressService } from '../../services/customer-address/cb-customer-address.service';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CbModalService } from 'src/app/projects/contract-booker/services/modal/cb-modal.service';
import citiesListJson from 'src/assets/json-data/projects/contract-booker/cities.json';
import stateListJson from 'src/assets/json-data/projects/contract-booker/states.json';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { CustomerAddressData } from '../../models/cb-customer-address';
import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cb-customer-address',
    templateUrl: './cb-customer-address.page.html',
    styleUrls: ['./cb-customer-address.page.scss'],
    standalone: false
})

export class CbCustomerAddressPage implements OnInit, OnDestroy {

    private routeSubscription!: Subscription;

    contract!: Contract;
    isValidatingCustomerAddressForm: boolean = false;
    customerAddressFormHelpers = cbCustomerAddressHelpers;
    customerAddressForm: UntypedFormGroup = new UntypedFormBuilder().group({
        isNewCustomer: [true, Validators.required],
        customerNumber: ['0224518800', Validators.compose([
            Validators.minLength(cbCustomerAddressHelpers.customerNumberMinLength),
            Validators.maxLength(cbCustomerAddressHelpers.customerNumberMaxLength)
        ])],
        isPrivateCustomer: [true, Validators.required],
        company: ['Parkar&Parkar', this.isCompanyRequiredValidator()],
        state: ['Maharashtra', Validators.compose([Validators.required])],
        city: ['Mumbai', Validators.compose([Validators.required])],
        postCode: ['400009', Validators.compose([
            Validators.required,
            Validators.minLength(cbCustomerAddressHelpers.postCodeMinLength),
            Validators.maxLength(cbCustomerAddressHelpers.postCodeMaxLength)]
        )]
    });

    constructor(
        private _route: ActivatedRoute,
        private _cbAlertService: CbAlertService,
        private _cbModalService: CbModalService,
        private _translateService: TranslateService,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService,
        private _cbCustomerAddressService: CbCustomerAddressService,
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
        const detectIsNewCustomerChanges = () => {
            this.customerAddressForm.get('isNewCustomer')?.valueChanges.subscribe(() => {
                this.customerAddressForm.get('customerNumber')?.setValidators(Validators.required);
                this.customerAddressForm.get('customerNumber')?.updateValueAndValidity();
            });
        }

        const detectIsPrivateCustomerChanges = () => {
            this.customerAddressForm.get('isPrivateCustomer')?.valueChanges.subscribe(() => {
                this.customerAddressForm.get('company')?.setValidators(this.isCompanyRequiredValidator());
                this.customerAddressForm.get('company')?.updateValueAndValidity();
            });
        }

        detectIsNewCustomerChanges();
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
            this.contract = contract;
            this._setCustomerAddressFromExistingContract();
        } else {
            this._handleExistingContractDataNotFound(contract);
        }
    }

    private _setCustomerAddressFromExistingContract() {
        this.customerAddressForm.get('isNewCustomer')?.setValue(this.contract.isNewCustomer);
        this.customerAddressForm.get('customerNumber')?.setValue(this.contract.customerNumber);
        this.customerAddressForm.get('isPrivateCustomer')?.setValue(this.contract.isPrivateCustomer);
        this.customerAddressForm.get('company')?.setValue(this.contract.company);
        this.customerAddressForm.get('state')?.setValue(this.contract.state);
        this.customerAddressForm.get('city')?.setValue(this.contract.city);
        this.customerAddressForm.get('postCode')?.setValue(this.contract.postCode);
    }

    private _handleExistingContractDataNotFound(contract: Contract | undefined) {
        if (!contract) {
            this._cbAlertService.showAlertForContractDataNotFound('Contract');
            return;
        }

        const missingProperty = 
            (!contract.isNewCustomer && !contract.customerNumber) ? 'CustomerNumber'
            : (!contract.isPrivateCustomer && !contract?.company) ? 'Company'
            : !contract.state ? 'State'
            : !contract.city ? 'City'
            : !contract.postCode ? 'PostCode'
            : null;
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
            if (!this.customerAddressForm.get('isNewCustomer')?.value) {
                if (!this._canProceedWithCustomerNumber()) {
                    this._showValidatingFormLoader(false);
                    return;
                }
            }

            const newCustomerAddressData = this._getNewCustomerAddressData(
                this.customerAddressForm.get('isNewCustomer')?.value,
                this.customerAddressForm.get('customerNumber')?.value,
                this.customerAddressForm.get('isPrivateCustomer')?.value,
                this.customerAddressForm.get('company')?.value,
                this.customerAddressForm.get('state')?.value,
                this.customerAddressForm.get('city')?.value,
                this.customerAddressForm.get('postCode')?.value,
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

    private _getNewCustomerAddressData(
        isNewCustomer: boolean,
        customerNumber: string,
        isPrivateCustomer: boolean,
        company: string,
        state: string,
        city: string,
        postCode: string
    ) {
        return new CustomerAddressData({ isNewCustomer, customerNumber, isPrivateCustomer, company, state, city, postCode });
    }

    private _showValidatingFormLoader(value: boolean) {
        this.isValidatingCustomerAddressForm = value;
    }

    private _openProductSelection(newContract: Contract) {
        this._cbRoutingService.goToCbProductSelection(newContract.id, {});
    }

    private _canProceedWithCustomerNumber(): boolean {
        const customerNumber = this.customerAddressForm.get('customerNumber')?.value;
        if (!customerNumber) {
            this._cbAlertService.showAlert(
                CbAlertHelpers.customerNumberNotFound,
                this._translateService.instant('CB.CUSTOMER_ADDRESS.NO_CUSTOMER_NUMBER'),
                this._translateService.instant('CB.CUSTOMER_ADDRESS.CUSTOMER_NUMBER_NOT_ENTERED')
            );
            return false;
        }
    
        const customerExists = this._cbCustomerAddressService.getExistingCustomerByCustomerNumber(customerNumber);
        if (!customerExists) {
            this._cbAlertService.showAlert(
                CbAlertHelpers.customerNumberNotFound,
                this._translateService.instant('CB.CUSTOMER_ADDRESS.CUSTOMER_NOT_FOUND'),
                this._translateService.instant('CB.CUSTOMER_ADDRESS.CUSTOMER_NUMBER_DOES_NOT_EXIST', {
                    customerNumber: this.customerAddressForm.get('customerNumber')?.value
                })
            );
            return false;
        }
    
        return true;
    }    
}