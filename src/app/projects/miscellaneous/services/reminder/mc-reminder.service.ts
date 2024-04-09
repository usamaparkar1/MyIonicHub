import { LocalNotificationSchema, LocalNotifications } from '@capacitor/local-notifications';
import { PushNotificationHelpers } from '../../helpers/mc-reminder-helpers';
import { McHelperService } from '../helper/mc-helper.service';
import { McReminder } from '../../models/mc-reminder.model';
import { McToastService } from '../toast/mc-toast.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class McReminderService {

    remindersSubject: BehaviorSubject<McReminder[]> = new BehaviorSubject<McReminder[]>([]);
    reminders$: Observable<McReminder[]> = this.remindersSubject.asObservable();
    

    constructor(
        private _mcToastService: McToastService,
        private _mcHelperService: McHelperService,
        private _translateService: TranslateService,
    ) { }

    async loadAllReminders(): Promise<McReminder[]> {
        const pendingRemindersLocal = (await LocalNotifications.getPending()).notifications?.map((pn) => new McReminder({
            id: pn.id,
            title: pn.title,
            interval: pn.extra.interval,
            description: pn.body,
            schedule: pn.schedule,
        }));

        if (pendingRemindersLocal?.length > 0) {
            this.remindersSubject.next(pendingRemindersLocal);
        }

        return this.remindersSubject.getValue();
    }

    getAllReminders(): McReminder[] {
        return this.remindersSubject.getValue();
    }

    addReminder(newReminder: McReminder): void {
        const remindersArray = this.remindersSubject.getValue();
        const reminderExistsIndex = remindersArray.findIndex((x) => x.id === newReminder.id);

        if (reminderExistsIndex >= 0) {
            remindersArray.splice(reminderExistsIndex, 1, newReminder);
        } else {
            remindersArray.push(newReminder);
        }

        this.remindersSubject.next(remindersArray);
        this.scheduleNotification(newReminder);
    }

    async scheduleNotification(reminder: McReminder) {
        await LocalNotifications.schedule({
            notifications: [
                {
                    id: reminder.id,
                    ongoing: true,
                    title: reminder.title,
                    body: reminder.description,
                    actionTypeId: PushNotificationHelpers.actionTypeId,
                    schedule: reminder.schedule,
                    extra: {
                        interval: reminder.interval
                    }
                }
            ]
        });
    }

    async getNewReminderId(): Promise<number> {
        try {
            const data = await LocalNotifications.getPending();
            
            if (!data || !Array.isArray(data.notifications) || data.notifications.length === 0) {
                return 1; // No pending notifications, return 1 as the default ID
            }
    
            const lastNotification = data.notifications[data.notifications.length - 1];
            
            if (lastNotification && typeof lastNotification.id === 'number') {
                return lastNotification.id + 1;
            } else {
                const errorMessage: string = this._translateService.instant('MC.REMINDER.INVALID_NOTIFICATION_ID');
                this._mcToastService.showReminderFailureToast(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage: string = `${error}`;
            this._mcToastService.showReminderFailureToast(errorMessage);
            throw new Error(errorMessage);
        }
    }

    removeReminder(id:number, index: number) {
        LocalNotifications.cancel({
            notifications: [
                {
                    id: id
                }
            ]
        }).catch((error) => {
            throw new Error(`${error}: Unable to delete Reminder`);
        }).then(() => {
            const remindersArray = this.remindersSubject.getValue();
            remindersArray.splice(index, 1);
            this.remindersSubject.next(remindersArray); 
        });
    }

    async setReminderForTomorrow(notification: LocalNotificationSchema) {
        const currentDate = new Date(notification.schedule?.at ?? Date.now());
        const newReminder = new McReminder({
            id: notification.id,
            title: notification.title,
            description: notification.body,
            interval: notification.extra?.interval,
            schedule: {
                at: new Date(currentDate.getTime() + this._mcHelperService.getOneDayFromNowInMiliseconds()),
                every: notification.schedule?.every,
                on: notification.schedule?.on
            },
        });

        const remindersArray = this.remindersSubject.getValue();
        const reminderExistsIndex = remindersArray.findIndex((x) => x.id === notification.id);

        if (reminderExistsIndex >= 0) {
            remindersArray.splice(reminderExistsIndex, 1, newReminder);
        } else {
            remindersArray.push(newReminder);
        }
    }
}