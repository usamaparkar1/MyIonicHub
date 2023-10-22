import { localHelpers } from 'src/app/helpers/local-helpers';
import { ToastButton, ToastController, ToastOptions } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { toastHelpers } from 'src/app/helpers/toast-helpers';
import { TranslationService } from '../translation/translation.service';

@Injectable({
  providedIn: 'root'
})

export class ToastService {

    constructor(
        private _translationService: TranslationService,
        private _toastController: ToastController
    ) {}

    async showToast(toastOptions: ToastOptions, notificationType: NotificationType = NotificationType.Default) {
        toastOptions.color = notificationType;
        if (!toastOptions.position) {
            toastOptions.position = 'top';
        }
        if (!toastOptions?.buttons || toastOptions?.buttons?.length === 0) {
            toastOptions.duration = localHelpers.toastTimeoutDuration;
        }
        const toast = await this._toastController.create(toastOptions);

        await toast.present();
    }

    async showNoInternetConnectionToast() {
        this.showToast({
            id: toastHelpers.userIsOffline,
            message: this._translationService.instant('TOAST.NETWORK.USER_IS_OFFLINE')
        });
    }
}

export enum NotificationType {
    Default = 'primary',
    Warning = 'warning',
    Error = 'danger'
}