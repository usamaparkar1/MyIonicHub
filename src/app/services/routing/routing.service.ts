import { routingHelpers } from 'src/app/helpers/routing-helpers';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RoutingService {

    constructor(
        private _router: Router,
    ) { }

    async goToPage(url: string, navigationExtras: NavigationExtras) {
        await this._router.navigateByUrl(url, navigationExtras)
    }

    async goToScreenLoader(navigationExtras: NavigationExtras = {}) {
        await this.goToPage(routingHelpers.screenLoader, navigationExtras);
    }

    async goToIntroduction(navigationExtras: NavigationExtras = {}) {
        await this.goToPage(routingHelpers.introduction, navigationExtras);
    }

    async goToLogin(navigationExtras: NavigationExtras = {}) {
        await this.goToPage(routingHelpers.login, navigationExtras);
    }

    async goToDashboard(navigationExtras: NavigationExtras = {}) {
        await this.goToPage(routingHelpers.dashboard, navigationExtras);
    }
}
