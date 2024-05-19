import { ConnectionStatus, Network } from '@capacitor/network';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NetworkService {

    private _isOnline$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isOnline() {
        return this._isOnline$.getValue();
    }

    constructor(
        private _platform: Platform
    ) {
    }

    async networkInit() {
        this._platform.ready().then(async () => {
            await this._setNetworkConnectionOnInit();
            await this._startNetworkListener();
            await this._startPlatformListener();
        });
    }

    private async _setNetworkConnectionOnInit() {
        const userIsConnected = this.isNetworkConnected(await Network.getStatus());
        this._setIsOnline(userIsConnected);
    }

    private _startNetworkListener() {
        Network.addListener("networkStatusChange", (status) => {
            if (this.isOnline !== status?.connected) {
                if (this.isNetworkConnected(status)) {
                    this._setIsOnline(true);
                } else {
                    this._setIsOnline(false);
                }
            }
        });
    }

    private isNetworkConnected(status: ConnectionStatus): boolean {
        return status?.connected && (status?.connectionType !== 'none');
    }

    private _setIsOnline(value: boolean) {
        this._isOnline$.next(value);
    }

    private _startPlatformListener() {
        this._platform.resume.subscribe(() => {
            this._startNetworkListener();
        });

        this._platform.pause.subscribe(() => {
            this._removeNetworkListener();
        });
    }

    private _removeNetworkListener() {
        Network.removeAllListeners();
    }
}
