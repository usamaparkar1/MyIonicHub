import { ActionPerformed, LocalNotificationSchema, LocalNotifications } from '@capacitor/local-notifications';
import { PushNotificationHelpers, McReminderHelpers } from '../../helpers/mc-reminder-helpers';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { McReminderService } from '../../services/reminder/mc-reminder.service';
import { McHelperService } from '../../services/helper/mc-helper.service';
import { McAlertService } from '../../services/alert/mc-alert.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { mcAlertHelpers } from '../../helpers/mc-alert-helper';
import { toastHelpers } from 'src/app/helpers/toast-helpers';
import { McReminder } from '../../models/mc-reminder';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mc-reminder',
  templateUrl: './mc-reminder.page.html',
  styleUrls: ['./mc-reminder.page.scss'],
})

export class McReminderPage implements OnInit {

    reminderFormValidators = McReminderHelpers;
    newReminderForm = new UntypedFormGroup({
        title: new UntypedFormControl(
            null, 
            Validators.compose([
                Validators.required,
                Validators.minLength(this.reminderFormValidators.MinLengthForTitle),
                Validators.maxLength(this.reminderFormValidators.MaxLengthForTitle)
            ])
        ),
        description: new UntypedFormControl(
            null,
            Validators.compose([Validators.maxLength(this.reminderFormValidators.MaxLengthForDescription)])
        ),
        interval: new UntypedFormControl(
            null,
            Validators.compose([
                Validators.required,
                Validators.min(this.reminderFormValidators.MinTimeForInterval),
                Validators.max(this.reminderFormValidators.MaxTimeForInterval)
            ])
        )
    });
    reminders: McReminder[] = []

    constructor(
        private _toastService: ToastService,
        private _mcAlertService: McAlertService,
        private _mcHelperService: McHelperService,
        private _translateService: TranslateService,
        private _mcReminderService: McReminderService,
    ) { }

    ngOnInit() {
        this._setupRemindersPage();
    }

    private async _setupRemindersPage() {
        await this._setupNotificationPlugin();
        this._loadReminders();
    }

    private async _setupNotificationPlugin() {
        if (await this._isPermissionDenied()) {
            return;
        }

        await this._registerNotificationActionButtons();
        await this._addNotificationEventListeners();
    }

    private async _isPermissionDenied(): Promise<boolean> {
        const permissionStatus = await LocalNotifications.requestPermissions();
        
        if (permissionStatus.display === 'denied') {
            await this._mcAlertService.showAlert(
                mcAlertHelpers.notificationPermissionDenied,
                this._translateService.instant('MC.REMINDER.NOTIFICATION_PERMISSION_DENIED'),
                this._translateService.instant('MC.REMINDER.GRANT_NOTIFICATION_PERMISSION'),
            );
            return true;
        }

        return false;
    }

    private async _registerNotificationActionButtons() {
        await LocalNotifications.registerActionTypes({
            types: [
                {
                    id: PushNotificationHelpers.actionTypeId,
                    actions: [
                        {
                            id: PushNotificationHelpers.snoozeActionId,
                            title: PushNotificationHelpers.snoozeActionTitle
                        },
                        {
                            id: PushNotificationHelpers.completedActionId,
                            title: PushNotificationHelpers.completedActionTitle
                        },
                    ]
                }
            ]
        });
    }

    private async _addNotificationEventListeners() {
        LocalNotifications.addListener("localNotificationReceived", (notification: LocalNotificationSchema) => {
            this._mcAlertService.showAlert(
                mcAlertHelpers.reminderAlert + notification.id,
                notification.title,
                notification.body,
                [
                    {
                        text: PushNotificationHelpers.snoozeActionId,
                        handler: () => {
                            this._snoozeExistingReminder(notification);
                        }
                    },
                    {
                        text: PushNotificationHelpers.completedActionTitle,
                        handler: () => {
                            this._setReminderForTomorrow(notification);
                        }
                    }
                ]
            );
        });

        LocalNotifications.addListener("localNotificationActionPerformed", (notificationAction: ActionPerformed) => {
            if (notificationAction.actionId === PushNotificationHelpers.snoozeActionId) {
                this._snoozeExistingReminder(notificationAction.notification);
            } else if (notificationAction.actionId === PushNotificationHelpers.completedActionId) {
                this._setReminderForTomorrow(notificationAction.notification);
            }
        });
    }

    private _snoozeExistingReminder(notification: LocalNotificationSchema) {
        const oldTime = new Date(notification.schedule?.at ?? new Date());
        const timeInMilliSeconds = this._mcHelperService.getHoursInMiliseconds(notification.extra?.interval)
        const newReminder = new McReminder({
            id: notification.id,
            title: notification.title,
            description: notification.body,
            interval: notification.extra?.interval,
            schedule: {
                at: new Date(oldTime.getTime() + timeInMilliSeconds),
            }
        });

        this._removeDeliveredNotificationsFromDrawer(notification);
        this._mcReminderService.addReminder(newReminder);
    }

    private _setReminderForTomorrow(notification: LocalNotificationSchema) {
        const oldTime = new Date(notification.schedule?.at ?? new Date()).getTime();
        const newReminder = new McReminder({
            id: notification.id,
            title: notification.title,
            description: notification.body,
            interval: notification.extra?.interval,
            schedule: {
                at: new Date(oldTime + this._mcHelperService.getOneDayFromNowInMiliseconds()),
                every: notification.schedule?.every,
                on: notification.schedule?.on,
            }
        });

        this._removeDeliveredNotificationsFromDrawer(notification);
        this._mcReminderService.addReminder(newReminder);
    }

    private _removeDeliveredNotificationsFromDrawer(notification: LocalNotificationSchema) {
        LocalNotifications.removeDeliveredNotifications({
            notifications: [
                {
                    id: notification.id,
                    title: notification.title,
                    body: notification.body,
                }
            ]
        });
    }

    private _loadReminders() {
        this._mcReminderService.reminders$.subscribe((data: McReminder[]) => {
            if (data?.length > 0) {
                this.reminders = data;
            }
        });
    }

    async validateReminderForm() {
        const isReminderFormValid = await this._isReminderFormValid();
        if (!isReminderFormValid) {
            return;
        }

        this._createReminder();
    }

    private _isReminderFormValid(): boolean {
        if (this.newReminderForm.invalid) {
            const isTitleValid = this._isTitleValid();
            if (!isTitleValid) {
                return false;
            }

            const isIntervalValid = this._isIntervalValid();
            if (!isIntervalValid) {
                return false;
            }

            const isDescriptionValid = this._isDescriptionValid();
            if (!isDescriptionValid) {
                return false;
            }
        }

        return true;
    }

    private _isTitleValid(): boolean {
        const titleErrors = this.newReminderForm.controls['title']?.errors;
        const showMessageForInvalidTitle = async (message: string) => {
            await this._toastService.showToast({
                id: toastHelpers.invalidForm + 'title',
                message: message
            });
        }

        if (titleErrors?.['required']) {
            showMessageForInvalidTitle('Title is a required field');
            return false;
        } else if (titleErrors?.['minlength']) {
            showMessageForInvalidTitle(`Title must be atleast ${titleErrors?.['minlength']?.requiredLength} characters long`);
            return false;
        } else if (titleErrors?.['maxlength']) {
            showMessageForInvalidTitle(`Title must be less than ${titleErrors?.['maxlength']?.requiredLength} characters`);
            return false;
        }

        return true;
    }

    private _isIntervalValid(): boolean {
        const intervalErrors = this.newReminderForm.controls['interval']?.errors;
        const showMessageForInvalidInterval = async (message: string) => {
            await this._toastService.showToast({
                id: toastHelpers.invalidForm + 'interval',
                message: message
            });
        }

        if (intervalErrors?.['required']) {
            showMessageForInvalidInterval('Interval is a required field');
            return false;
        } else if (intervalErrors?.['min']) {
            showMessageForInvalidInterval(`Interval must be atleast ${intervalErrors?.['min']?.min} hour long`);
            return false;
        } else if (intervalErrors?.['max']) {
            showMessageForInvalidInterval(`Interval must be less than ${intervalErrors?.['max']?.max} hours`);
            return false;
        }

        return true;
    }

    private _isDescriptionValid(): boolean {
        const descriptionErrors = this.newReminderForm.controls['description']?.errors;
        const showMessageForInvalidDescription = async (message: string) => {
            await this._toastService.showToast({
                id: toastHelpers.invalidForm + 'description',
                message: message
            });
        }

        if (descriptionErrors?.['maxlength']) {
            showMessageForInvalidDescription(`Description must be less than ${descriptionErrors?.['maxlength']?.requiredLength} characters`);
            return false;
        }

        return true;
    }

    private async _createReminder() {
        const currentTime = new Date();
        const timeInMilliSeconds = this._mcHelperService.getHoursInMiliseconds(this.newReminderForm.get('interval')?.value);

        const newReminder = new McReminder({
            id: await this._mcReminderService.getNewReminderId(),
            title: this.newReminderForm.get('title')?.value,
            interval: this.newReminderForm.get('interval')?.value,
            description: this.newReminderForm.get('description')?.value,
            schedule: {
                at: new Date(currentTime.getTime() + timeInMilliSeconds), 
            }
        });
 
        this._mcReminderService.addReminder(newReminder);
        this.newReminderForm.reset();
    }

    deleteReminder(id: number, index: number) {
        this._mcReminderService.removeReminder(id, index);
    }
}
