import { CbDbAppointmentsService } from '../cb-db-appointments/cb-db-appointments.service';
import { cbToastHelpers } from '../../helpers/cb-toast-helpers';
import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { CbAlertService } from '../alert/cb-alert.service';
import { CbToastService } from '../toast/cb-toast.service';
import { CbAppointment } from '../../models/cb-appoinment';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CbAppointmentsService {

    appointments: BehaviorSubject<CbAppointment[]> = new BehaviorSubject<CbAppointment[]>([]);

    /** @description Create a copy of the appointments using spread syntax for immutability */
    get allAppointments(): CbAppointment[] {
        return [...this.appointments.getValue()];
    }

    constructor(
        private _cbAlertService: CbAlertService,
        private _cbToastService: CbToastService,
        private _translateService: TranslateService,
        private _cbDbAppointmentsService: CbDbAppointmentsService
    ) { }

    async loadAllAppointments(): Promise<CbAppointment[] | undefined> {
        return await new Promise(async (resolve, reject) => {
            try {
                const response = await this._cbDbAppointmentsService.getAll();

                if (response?.length > 0 ) {
                    this.appointments.next(response);
                }

                resolve(response);
            } catch (error) {
                this._cbToastService.showToast({
                    id: cbToastHelpers.couldNotLoadAppointments,
                    header: this._translateService.instant('CORE.ERROR'),
                    message: this._translateService.instant('CB.APPOINTMENTS.ERROR_LOADING_APPOINTMENTS'),
                });
                reject(this.allAppointments);
            }
        });
    }

    async deleteAppointment(appointment: CbAppointment): Promise<boolean> {
        const isDeleteSuccessfull = await this._cbDbAppointmentsService.remove(appointment);

        if (isDeleteSuccessfull) {
            const index = this.appointments.getValue().findIndex(a => a.id === appointment.id);

            if (index !== -1) {
                const updatedAppointments = this.allAppointments.filter(a => a.id !== appointment.id);
                this.appointments.next(updatedAppointments);
                this._cbToastService.showToast({
                    id: cbToastHelpers.appointmentDeleted,
                    header: this._translateService.instant('CB.APPOINTMENTS.DELETE_APPOINTMENT_SUCCESS'),
                    message: this._translateService.instant('CB.APPOINTMENTS.APPOINTMENT_HAS_BEEN_DELETED'),
                });
            } else {
                this._cbAlertService.showAlert(
                    CbAlertHelpers.couldNotFindAppointmentById,
                    this._translateService.instant('CORE.ERROR'),
                    this._translateService.instant('CB.APPOINTMENTS.COULD_NOT_FIND_APPOINTMENT_BY_ID', {
                        appointmentId: appointment.id
                    }),
                );
            }

            return true;
        } else {
            // No need to show information here as a toast will be shown if anything goes wrong during the database delete operation.
            return false;
        }
    }
}
