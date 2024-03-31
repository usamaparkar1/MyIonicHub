import { McRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class McRoutingService {

    constructor(
        private _router: Router
    ) { }

    async goToMcPage(url: string, navigationExtras: NavigationExtras) {
        await this._router.navigate([McRoutingHelpers.mc, url], navigationExtras)
    }

    async goToMcHome(navigationExtras: NavigationExtras = {}) {
        await this.goToMcPage(McRoutingHelpers.mcHome, navigationExtras);
    }

    async goToMcReminder(navigationExtras: NavigationExtras = {}) {
        await this.goToMcPage(McRoutingHelpers.mcReminder, navigationExtras);
    }
}
