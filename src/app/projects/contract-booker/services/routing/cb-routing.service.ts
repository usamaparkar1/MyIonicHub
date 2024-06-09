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

    async goToCbPage(url: string, paramId: string | null = null, navigationExtras: NavigationExtras) {
        if (paramId) {
            await this._router.navigate([CbRoutingHelpers.cb, url, paramId], navigationExtras)
        } else {
            await this._router.navigate([CbRoutingHelpers.cb, url], navigationExtras)
        }
    }

    async findLastUsedRoute(contract: Contract) {
        switch (contract.currentRoute) {
            case CbRoutingHelpers.cbCustomerAddress:
                this.goToCbCustomerAddress();
                break;
            case CbRoutingHelpers.cbProductSelection:
                this.goToCbProductSelection(contract.id);
                break;
            case CbRoutingHelpers.cbProductDetails:
                this.goToCbProductDetails(contract.id);
                break;
            case CbRoutingHelpers.cbShoppingCart:
                this.goToCbShoppingCart();
                break;
            case CbRoutingHelpers.cbAddContract:
                this.goToCbAddContract();
                break;
            case CbRoutingHelpers.cbSignContract:
                this.goToCbSignContract(contract.id);
                break;

            default:
                this.handleRouteNotFound();
                break;
        }
    }

    async goToCbHome(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbHome, null, navigationExtras);
    }

    async goToCbCustomerAddress(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbCustomerAddress, null, navigationExtras);
    }

    async goToCbProductSelection(contractId: string, navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbProductSelection, contractId, navigationExtras);
    }

    async goToCbStandardConsultation(contractId: string, navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbStandardConsultation, contractId, navigationExtras);
    }

    async goToCbPriceComparison(contractId: string, navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbPriceComparison, contractId, navigationExtras);
    }

    async goToCbProductDetails(contractId: string, navigationExtras: NavigationExtras = {}) {;
        await this.goToCbPage(CbRoutingHelpers.cbProductDetails, contractId, navigationExtras);
    }

    async goToCbShoppingCart(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbShoppingCart, null, navigationExtras);
    }

    async goToCbAddContract(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbAddContract, null, navigationExtras);
    }

    async goToCbSignContract(contractId: string, navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbSignContract, contractId, navigationExtras);
    }

    async goToCbMyContracts(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbMyContracts, null, navigationExtras);
    }

    async goToCbNews(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbNews, null, navigationExtras);
    }

    async goToCbAppointments(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbAppointments, null, navigationExtras);
    }

    async goToCbNewAppointment(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbNewAppointment, null, navigationExtras);
    }

    async goToCbEditAppointment(appointmentId: string, navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbEditAppointment, appointmentId, navigationExtras);
    }

    async goToCbSupport(navigationExtras: NavigationExtras = {}) {
        await this.goToCbPage(CbRoutingHelpers.cbSupport, null, navigationExtras);
    }

    async handleRouteNotFound() { 
        'Route not found. Go To Shopping Cart'
    }
}
