import { CbAppointmentsService } from '../../services/cb-appointments/cb-appointments.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CbAppointment } from '../../models/cb-appoinment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CbAppointmentsResolverService {

    constructor(
        private _cbAppointmentsService: CbAppointmentsService
    ) { }

    resolve: ResolveFn<Observable<CbAppointment[] | undefined>> = async (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<Observable<CbAppointment[] | undefined>> => {
        return of(await this._cbAppointmentsService.loadAllAppointments());
    }
}
