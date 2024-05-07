import { CbNewAppointmentService } from '../../services/cb-new-appointment/cb-new-appointment.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CbAppointment } from '../../models/cb-appoinment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CbNewAppointmentResolverService {

    constructor(
        private _cbNewAppointmentService: CbNewAppointmentService
    ) { }

    resolve: ResolveFn<CbAppointment | null> = async (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ): Promise<CbAppointment | null> => {
        const appointmentId = route.params['appointmentId'];
    
        if (appointmentId) {
            return await this._cbNewAppointmentService.getAppointmentById(appointmentId);
        } else {
            return null;
        }
    }
}
