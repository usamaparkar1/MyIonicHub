import { TranslationService } from 'src/app/services/translation/translation.service';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SqliteService } from 'src/app/services/sqlite/sqlite.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

    constructor(
        private _platform: Platform,
        private _toastService: ToastService,
        private _sqliteService: SqliteService,
        private _storageService: StorageService,
        private _routingService: RoutingService,
        private _apphelperService: AppHelperService,
        private _translationService: TranslationService
    ) {
        this._platform.ready().then(() => {
            this._init();
        });
    }

    private async _init() {
        await this._loadAppTranslations();
        await this._loadAppHelpers();
        await this._setupStorage()
        await this._initialiseSqlite();
        if(!await this._storageService.getCurrentStorageDriver()) {
            // Storage is not setup. App cant proceed further.
            this.showToastForServiceInitError(this._toastService.storageNotSetup, 'StorageService');
            return;
        }
        await this.goToScreenLoader();
    }

    private async _loadAppTranslations() {
        // Load locale and setup translations for any error handling or user messages
        await this._translationService.setupTranslations();
    }

    private async _loadAppHelpers() {
        await this._apphelperService.setupAppHelpers();
        if (!this._apphelperService.getPlatformName) {
            await this.showToastForServiceInitError(this._toastService.appHelperNotSetup, 'AppHelpers');
        }
    }

    private async _initialiseSqlite() {
        await this._sqliteService.initialiseSqliteApp(this._apphelperService.isWeb());
        if (!this._sqliteService.getSqliteConnection()) {
            this.showToastForServiceInitError(this._toastService.sqliteNotSetup, 'SqliteService');
        }
    }

    private async _setupStorage() {
        await this._storageService.setupStorage();
    }

    async showToastForServiceInitError(id: string, serviceName: string) {
        await this._toastService.showToast(
            id,
            this._translationService.instant('TOAST.HEADER'),
            this._translationService.instant('TOAST.SERVICE_NOT_SETUP', {
                serviceName: serviceName
            })
        );
    }

    async goToScreenLoader() {
        await this._routingService.goToScreenLoader();
    }
}
