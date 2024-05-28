import { coreRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { NavigationExtras, Router, UrlTree } from '@angular/router';
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
        await this.goToPage(coreRoutingHelpers.screenLoader, navigationExtras);
    }

    async goToIntroduction(navigationExtras: NavigationExtras = {}) {
        await this.goToPage(coreRoutingHelpers.introduction, navigationExtras);
    }

    async goToLogin(navigationExtras: NavigationExtras = {}) {
        await this.goToPage(coreRoutingHelpers.login, navigationExtras);
    }

    async goToSignup(navigationExtras: NavigationExtras = {}) {
        await this.goToPage(coreRoutingHelpers.signup, navigationExtras);
    }

    async goToDashboard(navigationExtras: NavigationExtras = {}) {
        await this.goToPage(coreRoutingHelpers.dashboard, navigationExtras);
    }

    async createUrlTree(urlSegments: string[]): Promise<UrlTree> {
        return this._router.createUrlTree(urlSegments);
    }
}
