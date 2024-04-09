import { cbToastHelpers } from '../../helpers/cb-toast-helpers';
import { ToastController, ToastOptions } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CbToastService {

    constructor(
        private _toastController: ToastController
    ) { }

    async showToast(toastOptions: ToastOptions, cbnotificationType: CbNotificationType = CbNotificationType.Default) {
        toastOptions.color = cbnotificationType;
        if (!toastOptions.position) {
            toastOptions.position = 'top';
        }
        if (!toastOptions?.buttons || toastOptions?.buttons?.length === 0) {
            toastOptions.duration = cbToastHelpers.toastTimeoutDuration;
        }
        const toast = await this._toastController.create(toastOptions);

        await toast.present();
    }

}

export enum CbNotificationType {
    Default = 'primary',
    Warning = 'warning',
    Error = 'danger'
}
