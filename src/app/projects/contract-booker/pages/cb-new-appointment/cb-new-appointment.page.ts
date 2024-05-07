import { CbNewAppointmentService } from '../../services/cb-new-appointment/cb-new-appointment.service';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CbAppointmentsService } from '../../services/cb-appointments/cb-appointments.service';
import citiesListJson from 'src/assets/json-data/projects/contract-booker/cities.json';
import stateListJson from 'src/assets/json-data/projects/contract-booker/states.json';
import { cbCustomerAddressHelpers } from '../../helpers/cb-customer-address-helpers';
import { cbNewAppointmentHelpers } from '../../helpers/cb-new-appointment-helpers';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbToastService } from '../../services/toast/cb-toast.service';
import { CbModalService } from '../../services/modal/cb-modal.service';
import { CbDateService } from '../../services/cb-date/cb-date.service';
import { cbToastHelpers } from '../../helpers/cb-toast-helpers';
import { CbAppointment } from '../../models/cb-appoinment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cb-new-appointment',
    templateUrl: './cb-new-appointment.page.html',
    styleUrls: ['./cb-new-appointment.page.scss'],
})

export class CbNewAppointmentPage implements OnInit {

    private _oldAppointmentId: string | null = null;

    hideDatePicker: boolean = true;
    hideTimePicker: boolean = true;
    isValidatingNewAppointmentForm: boolean = false;
    newAppointmentFormHelpers = cbNewAppointmentHelpers;
    customerAddressFormHelpers = cbCustomerAddressHelpers;
    currentTime: string = this._cbDateService.getCurrentTime();
    todaysDate: string = this._cbDateService.getTodaysDateOnly();
    minuteValues: number[] = this._cbNewAppointmentService.cbMinutesAllowed;
    newAppointmentForm: UntypedFormGroup = new UntypedFormBuilder().group({
        appointmentTitle: ['New Gas Contract Booking', Validators.required],
        appointmentDescription: ['I need to book a gas contract for my house on a yearly basis', Validators.compose([
            Validators.required,
            Validators.maxLength(this.newAppointmentFormHelpers.descriptionMaxLength)
        ])],
        appointmentDate: [this._cbNewAppointmentService.getDefaultDate(), Validators.required],
        appointmentTime: [this._cbNewAppointmentService.getDefaultTime(), Validators.required],
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
        private _cbDateService: CbDateService,
        private _cbModalService: CbModalService,
        private _cbToastService: CbToastService,
        private _cbRoutingService: CbRoutingService,
        private _appHelperService: AppHelperService,
        private _cbAppointmentsService: CbAppointmentsService,
        private _cbNewAppointmentService: CbNewAppointmentService,
    ) { }

    ngOnInit() {
        this._setupNewAppointment();
    }

    private _setupNewAppointment() {
        this._getExistingAppointmentData();
    }

    private async _getExistingAppointmentData() {
        const oldAppointmentData = this._route.snapshot.data['oldAppointment'];

        if (oldAppointmentData?.id) {
            this._fillAppointmentData(oldAppointmentData);
        }
    }

    private _fillAppointmentData(oldAppointmentData: CbAppointment) {
        this._oldAppointmentId = oldAppointmentData.id;
        this.newAppointmentForm.get('appointmentTitle')?.setValue(oldAppointmentData.appointmentTitle);
        this.newAppointmentForm.get('appointmentDescription')?.setValue(oldAppointmentData.appointmentDescription);
        this.newAppointmentForm.get('appointmentDate')?.setValue(oldAppointmentData.appointmentDate);
        this.newAppointmentForm.get('appointmentTime')?.setValue(oldAppointmentData.appointmentTime);
        this.newAppointmentForm.get('state')?.setValue(oldAppointmentData.state);
        this.newAppointmentForm.get('city')?.setValue(oldAppointmentData.city);
        this.newAppointmentForm.get('postCode')?.setValue(oldAppointmentData.postCode);
    }

    isWorkday(dateString: string) {
        return this._cbNewAppointmentService.getAllowedDays(dateString);
    };

    toggleDatePicker() {
        this.hideDatePicker = !this.hideDatePicker;
    }

    toggleTimePicker() {
        this.hideTimePicker = !this.hideTimePicker;
    }

    dateChanged(event: any) {
        const pickedDate = event.detail.value;
        const newFormattedDate = this._cbNewAppointmentService.getFormattedDate(new Date(pickedDate));
        this.newAppointmentForm.get('appointmentDate')?.setValue(newFormattedDate);
    }

    timeChanged(event: any) {
        const pickedTime = new Date(event.detail.value);
        const newFormattedTime = this._cbNewAppointmentService.getFormattedTime(pickedTime);
        this.newAppointmentForm.get('appointmentTime')?.setValue(newFormattedTime);
    }

    async openStateSearchBar() {
        const searchBarModal = await this._cbModalService.openStateSearchBarModal(stateListJson);

        await searchBarModal.present();

        const { data, role } = await searchBarModal.onWillDismiss();
        if (role === 'confirm') {
            this.newAppointmentForm.get('state')?.setValue(data);
            this.newAppointmentForm.get('city')?.setValue(null);
        }
    }

    async openCitiesSearchBar() {
        if (this.newAppointmentForm.get('state')!.invalid) {
            return;
        }

        const cityList = this._getCitiesFilteredByState();
        const searchBarModal = await this._cbModalService.openCitySearchBarModal(cityList);

        await searchBarModal.present();

        const { data, role } = await searchBarModal.onWillDismiss();
        if (role === 'confirm') {
            this.newAppointmentForm.get('city')?.setValue(data);
        }
    }

    private _getCitiesFilteredByState() {
        const selectedState = this.newAppointmentForm.get('state')?.value;
        return (citiesListJson as any)[selectedState];
    }

    async validateNewAppointmentForm() {
        const isAppointmentFormValid = await this._isAppointmentFormValid();
        if (!isAppointmentFormValid) {
            return;
        }
    
        await this._createNewAppointment();
    }

    private _isAppointmentFormValid(): boolean {
        if (this.newAppointmentForm.invalid) {
            const appointmentTitleErrors = this.newAppointmentForm.controls['appointmentTitle']?.errors;
            const isAppointmentTitleValid = this._isAppointmentFormControlValid(appointmentTitleErrors, 'appointmentTitle');
            if (!isAppointmentTitleValid) {
                return false;
            }

            const appointmentDescriptionErrors = this.newAppointmentForm.controls['appointmentDescription']?.errors;
            const isAppointmentDescriptionValid = this._isAppointmentFormControlValid(appointmentDescriptionErrors, 'appointmentDescription');
            if (!isAppointmentDescriptionValid) {
                return false;
            }

            const appointmentDateErrors = this.newAppointmentForm.controls['appointmentDate']?.errors;
            const isAppointmentDateValid = this._isAppointmentFormControlValid(appointmentDateErrors, 'appointmentDate');
            if (!isAppointmentDateValid) {
                return false;
            }

            const appointmentTimeErrors = this.newAppointmentForm.controls['appointmentTime']?.errors;
            const isAppointmentTimeValid = this._isAppointmentFormControlValid(appointmentTimeErrors, 'appointmentTime');
            if (!isAppointmentTimeValid) {
                return false;
            }

            const stateErrors = this.newAppointmentForm.controls['state']?.errors;
            const isStateValid = this._isAppointmentFormControlValid(stateErrors, 'state');
            if (!isStateValid) {
                return false;
            }

            const cityErrors = this.newAppointmentForm.controls['city']?.errors;
            const isCityValid = this._isAppointmentFormControlValid(cityErrors, 'city');
            if (!isCityValid) {
                return false;
            }

            const postCodeErrors = this.newAppointmentForm.controls['postCode']?.errors;
            const isPostCodeValid = this._isAppointmentFormControlValid(postCodeErrors, 'postCode');
            if (!isPostCodeValid) {
                return false;
            }
        }

        return true;
    }

    private _isAppointmentFormControlValid(appointmentTitleErrors: ValidationErrors | null, controlName: string): boolean {
        const showMessageForInvalidAppointmentTitle = async (message: string) => {
            await this._cbToastService.showToast({
                id: cbToastHelpers.invalidNewAppointmentForm + 'appointmentTitle',
                message: message
            });
        }

        if (appointmentTitleErrors?.['required']) {
            showMessageForInvalidAppointmentTitle('You have not provided a username');
            return false;
        } else if (appointmentTitleErrors?.['minlength']) {
            showMessageForInvalidAppointmentTitle(`Username must be atleast ${appointmentTitleErrors?.['minlength']?.requiredLength} long`);
            return false;
        } else if (appointmentTitleErrors?.['maxlength']) {
            showMessageForInvalidAppointmentTitle(`Username must be less than ${appointmentTitleErrors?.['maxlength']?.requiredLength} characters`);
            return false;
        }
    
        return true;
    }

    private async _createNewAppointment() {
        try {
            this._showValidatingNewAppointmentFormLoader(true);
            const newAppointmentData = this._cbNewAppointmentService.getNewAppointmentFormData(
                this.newAppointmentForm.get('appointmentTitle')?.value,
                this.newAppointmentForm.get('appointmentDescription')?.value,
                this.newAppointmentForm.get('appointmentDate')?.value,
                this.newAppointmentForm.get('appointmentTime')?.value,
                this.newAppointmentForm.get('state')?.value,
                this.newAppointmentForm.get('city')?.value,
                this.newAppointmentForm.get('postCode')?.value,
                this._cbAppointmentsService.allAppointments
            );

            const isNewAppointment = this.getIsNewAppointment();
            const addAppointmentResponse = isNewAppointment
                ? await this._cbNewAppointmentService.addNewAppoitment(newAppointmentData)
                : await this._cbNewAppointmentService.saveEditedAppointment(newAppointmentData, this._oldAppointmentId!);
            if (addAppointmentResponse) {
                this.newAppointmentForm.reset();
                this._openAppointments();
            }
            this._showValidatingNewAppointmentFormLoader(false);
        } catch (error) {
            this._showValidatingNewAppointmentFormLoader(false);
        }
    }

    getIsNewAppointment() {
        return !this._oldAppointmentId;
    }

    private _showValidatingNewAppointmentFormLoader(value: boolean) {
        this.isValidatingNewAppointmentForm = value;
    }

    private _openAppointments() {
        this._cbRoutingService.goToCbAppointments();
    }
}
