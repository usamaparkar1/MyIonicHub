import { TranslationService } from './services/translation/translation.service';
import { StorageService } from './services/storage/storage.service';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { Component } from '@angular/core';
import { AlertService } from './services/alert/alert.service';
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  constructor(
    private _alertService: AlertService,
    private _storageService: StorageService,
    private _translationService: TranslationService
  ) {
    this._init();
  }

  private async _init() {
    await this._loadAppTranslations();
    
    // Storage is not setup. App cant proceed further.
    if(!(await this._setupStorage())) {
      return;
    }
  }

  private async _loadAppTranslations() {
    await this._translationService.setupTranslations();
  }

  private async _setupStorage() {
    const isStorageSetup = await this._storageService.setupStorage();

    if (!isStorageSetup) {
      await this._alertService.showAlert(
        this._alertService.storageNotSetup,
        this._translationService.instant('ALERT.HEADER'),
        this._translationService.instant('STORAGE.NOT_SETUP')
      )
    }

    return isStorageSetup;
  }
}
