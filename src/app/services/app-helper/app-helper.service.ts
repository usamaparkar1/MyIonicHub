import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AppHelperService {

  private _currentPlatform: string = Capacitor.getPlatform();

  constructor(private _platform: Platform) {}
  
  get getPlatformName(): string {
    return this._currentPlatform;
  }
  
  async setupAppHelpers(): Promise<boolean> {
    await this.setPlatformName();

    return this._currentPlatform !== null;
  }

  setPlatformName() {
    if (!this._currentPlatform) {
      this._currentPlatform = Capacitor.getPlatform();
    }
  }

  isWeb(): boolean {
    return this._platform.is('mobileweb');
  }

  isMobile(): boolean {
    return this._platform.is('mobile');
  }

  isAndroid(): boolean {
    return this._platform.is('android');
  }

  isIos(): boolean {
    return this._platform.is('ios');
  }

  isNative(): boolean {
    return this._platform.is('android') || this._platform.is('ios');
  }
}
