import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { McReminderService } from '../../reminder/mc-reminder.service';
import { McReminder } from '../../../models/mc-reminder.model';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class McRemindersResolverService {

    constructor(private _mcReminderService: McReminderService) {}

    resolve: ResolveFn<Observable<McReminder[] | undefined>> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable <McReminder[] | undefined> => {
        return from(this._mcReminderService.loadAllReminders());
    }
}
