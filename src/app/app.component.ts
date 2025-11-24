import { TranslationService } from 'src/app/services/translation/translation.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { register } from 'swiper/element/bundle';
import { Capacitor } from '@capacitor/core';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');
register();

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})

export class AppComponent {

    public isWeb: boolean = Capacitor.getPlatform() === 'web';

    constructor(
        private _platform: Platform,
        private _toastService: ToastService,
        private _routingService: RoutingService,
        private _translationService: TranslationService
    ) {
        this._platform.ready().then(() => {
            this._init();
        });
    }

    private async _init() {
        try {
            await this._loadAppTranslations();
            await this._goToScreenLoader();
            await this._hideSplashScreen()
        } catch (error) {
            await this._hideSplashScreen()
        }
    }

    private async _loadAppTranslations() {
        // Load locale and setup translations for any error handling or user messages
        await this._translationService.setupTranslations();
    }

    async showToastForServiceInitError(id: string, serviceName: string) {
        await this._toastService.showToast({
            id: id,
            header: this._translationService.instant('TOAST.HEADER'),
            message: this._translationService.instant('TOAST.SERVICE_NOT_SETUP', {
                serviceName: serviceName
            })
        });
    }

    private async _goToScreenLoader() {
        await this._routingService.goToScreenLoader({skipLocationChange: true, replaceUrl: true});
    }

    private async _hideSplashScreen() {
        await SplashScreen.hide();
    }
}
