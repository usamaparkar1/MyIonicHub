import { CbAppointmentsService } from '../../services/cb-appointments/cb-appointments.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbAppointment } from '../../models/cb-appoinment';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cb-appointments',
  templateUrl: './cb-appointments.page.html',
  styleUrls: ['./cb-appointments.page.scss'],
})

export class CbAppointmentsPage implements OnInit {

    private _appointmentsSubscription!: Subscription;

    appointments: CbAppointment[] = [];

    constructor(
        private _cbRoutingService: CbRoutingService,
        private _cbAppointmentsService: CbAppointmentsService,
    ) { }

    ngOnInit() {
        this._setupAppointments();
    }

    private async _setupAppointments() {
        this._subscribeToAppointments();
    }

    ngOnDestroy() {
        this._appointmentsSubscription.unsubscribe();
    }

    /** @description Listen for changes to Appointments Data */
    private _subscribeToAppointments() {
        this._appointmentsSubscription = this._cbAppointmentsService.appointments.subscribe((appointments) => {
            this.appointments = appointments;
        });
    }

    addNewAppointment() {
        this._cbRoutingService.goToCbNewAppointment();  
    }

    editAppointment(appointmentId: string) {
        this._cbRoutingService.goToCbEditAppointment(appointmentId);
    }

    async deleteAppointment(appointment: CbAppointment) {
        await this._cbAppointmentsService.deleteAppointment(appointment);
    }
}