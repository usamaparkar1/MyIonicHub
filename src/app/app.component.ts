import { TranslationService } from './services/translation.service';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { Component } from '@angular/core';
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  constructor(
    private _translationService: TranslationService
  ) {
    this._init();
  }

  private async _init() {
    await this._loadAppTranslations();
  }

  private async _loadAppTranslations() {
    await this._translationService.setupTranslations();
  }
}
