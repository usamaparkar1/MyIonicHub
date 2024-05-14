import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { CbRoutingHelpers } from 'src/app/helpers/routing-helpers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CbAuthenticationGuard {

    constructor(
        private _routingService: RoutingService,
        private _appHelperService: AppHelperService,
    ) { }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this._appHelperService.isUserLoggedIn && this._appHelperService.getCurrentAppInUseToken === CbRoutingHelpers.cbHome) {
            return true;
        } else {
            this._routingService.goToLogin({ replaceUrl: true });
            return false;
        }
    }
}