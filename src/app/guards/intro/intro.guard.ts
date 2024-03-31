import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IntroGuard {

    private _appHelperService = inject(AppHelperService);
    private _routingService = inject(RoutingService);

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (this._appHelperService.userHasSeenIntro) {
            this._routingService.goToLogin();
            return false;
        } else {
            return true;
        }
    }
}
