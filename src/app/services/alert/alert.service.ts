import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  readonly storageNotSetup: string = 'storageNotSetup';

  constructor(
    private _alertController: AlertController
  ) {}

  async showAlert(id: string, header: string, message: string) {
    const alert = await this._alertController.create({
      id: id,
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
