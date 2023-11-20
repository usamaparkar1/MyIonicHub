import { CbRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CbRoutingService {

    constructor(
        private _router: Router,
    ) {}

    async goToCbPage(url: string, navigationExtras: NavigationExtras) {
        await this._router.navigateByUrl(`${CbRoutingHelpers.cbHome}/${url}`, navigationExtras)
    }

    async goToCbCustomerAddress(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbCustomerAddress, navigationExtras);
    }
}
