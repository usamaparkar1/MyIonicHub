import { ToastController, ToastOptions } from '@ionic/angular';
import { McToastHelpers } from '../../helpers/mc-toast-helper';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class McToastService {

    constructor(
        private _toastController: ToastController,
        private _translateService: TranslateService,
    ) {}

    async showToast(toastOptions: ToastOptions, notificationType: McNotificationType = McNotificationType.Default) {
        toastOptions.color = notificationType;
        if (!toastOptions.position) {
            toastOptions.position = 'top';
        }
        if (!toastOptions?.buttons || toastOptions?.buttons?.length === 0) {
            toastOptions.duration = McToastHelpers.toastTimeoutDuration;
        }
        const toast = await this._toastController.create(toastOptions);

        await toast.present();
    }

    showReminderFailureToast(message: string) {
        this.showToast({
            id: McToastHelpers.scheduleReminderFailure,
            header: this._translateService.instant('MC.REMINDER.SCHEDULE_REMINDER_FAILURE'),
            message: message
        });
    }

}

export enum McNotificationType {
    Default = 'primary',
    Warning = 'warning',
    Error = 'danger'
}
