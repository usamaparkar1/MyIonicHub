import { locale as localeDe } from 'src/assets/translations/de';
import { locale as localeEn } from 'src/assets/translations/en';
import { localHelpers } from 'src/app/helpers/local-helpers';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor(
    private _translateService: TranslateService,
  ) {}

  getLanguageLocale(): string {
    return this._translateService.getDefaultLang();
  }

  instant(key: string, dynamicTranslation: any = null) {
    return this._translateService.instant(key, dynamicTranslation);
  }

  async setupTranslations() {
    this._translateService.setDefaultLang(localHelpers.defaultLanguage);
    await this._loadLocalTranslations();
  }

  private async _loadLocalTranslations() {
    await this._translateService.setTranslation(localeDe.lang, localeDe.data, true);
    await this._translateService.setTranslation(localeEn.lang, localeEn.data, true);
    await this._translateService.use(this.getLanguageLocale());
  }
}
