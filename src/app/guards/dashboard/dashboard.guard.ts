import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DashboardGuard {

    constructor(
        private _routingService: RoutingService,
        private _appHelperService: AppHelperService,
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (this._appHelperService.isUserLoggedIn) {
            return true;
        }

        return this._routingService.createUrlTree(['/login']);
    }
}
