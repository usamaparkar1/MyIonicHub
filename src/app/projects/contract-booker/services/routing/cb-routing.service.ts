import { CbRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { NavigationExtras, Router } from '@angular/router';
import { Contract } from '../../models/cb-contract';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CbRoutingService {

    constructor(
        private _router: Router,
    ) {}

    async goToCbPage(url: string, navigationExtras: NavigationExtras) {
        await this._router.navigate([CbRoutingHelpers.cb, url], navigationExtras)
    }

    async findLastUsedRoute(contract: Contract) {
        switch (contract.currentRoute) {
            case CbRoutingHelpers.cbCustomerAddress:
                this.goToCbCustomerAddress();
                break;
            case CbRoutingHelpers.cbProductSelection:
                this.goToCbProductSelection();
                break;
            case CbRoutingHelpers.cbProductDetails:
                this.goToProductDetails();
                break;

            default:
                this.handleRouteNotFound();
                break;
        }
    }

    async goToCbHome(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbHome, navigationExtras);
    }

    async goToCbCustomerAddress(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbCustomerAddress, navigationExtras);
    }

    async goToCbProductSelection(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbProductSelection, navigationExtras);
    }

    async goToCbStandardConsultation(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbStandardConsultation, navigationExtras);
    }

    async goToCbPriceComparison(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbPriceComparison, navigationExtras);
    }

    async goToProductDetails(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbProductDetails, navigationExtras);
    }

    
    async goToCustomerDetails(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbCustomerDetails, navigationExtras);
    }

    async handleRouteNotFound() { 
        'Route not found. Go To Shopping Cart'
    }
}
