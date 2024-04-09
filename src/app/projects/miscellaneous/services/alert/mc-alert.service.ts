import { AlertButton, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class McAlertService {

    constructor(
        private _alertController: AlertController
    ) {}

    async showAlert(id: string, header: string, message: string, buttons: (AlertButton | string)[] = ['Ok']) {
        const alert = await this._alertController.create({
            id: id,
            header: header,
            message: message,
            buttons: buttons,
        });

        await alert.present();
    }
}
