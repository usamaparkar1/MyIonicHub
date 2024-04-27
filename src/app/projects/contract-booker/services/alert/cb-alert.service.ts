import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { AlertButton, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CbAlertService {

    constructor(
        private _alertController: AlertController,
        private _translateService: TranslateService
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

    showAlertForContractDataNotFound(missingData: string) {
        this.showAlert(
            CbAlertHelpers.productDetailsRouteDataNotFound,
            this._translateService.instant('CB.PRODUCT_DETAILS.ROUTE_DATA_MISSING_TITLE'),
            this._translateService.instant('CB.PRODUCT_DETAILS.ROUTE_DATA_MISSING_DESCRIPTION', {
                missingData: missingData
            })
        );
    }

    showAlertForContractNotRemoved(errorMessage: string) {
        this.showAlert(
            CbAlertHelpers.couldNotRemoveContract,
            this._translateService.instant('CORE.ERROR'),
            errorMessage
        );
    }
}