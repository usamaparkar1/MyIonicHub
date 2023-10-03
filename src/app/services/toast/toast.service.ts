import { localHelpers } from 'src/app/helpers/local-helpers';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  readonly appHelperNotSetup: string = 'appHelperNotSetup';
  readonly storageNotSetup: string = 'storageNotSetup';
  readonly sqliteNotSetup: string = 'sqliteNotSetup';

  constructor(
    private _toastController: ToastController
  ) {}

  async showToast(id: string, header: string, message: string) {
    const toast = await this._toastController.create({
      id: id,
      header: header,
      message: message,
      duration: localHelpers.toastTimeoutDuration
    });

    toast.present();    
  }
}
