import { SecureStorageService } from 'src/app/services/secure-storage/secure-storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CbRightsService } from '../../services/rights/cb-rights.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CbSupportGuard {

    constructor(
        private _cbRightsService: CbRightsService,
        private _secureStorageService: SecureStorageService
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const secureUserData = await this._secureStorageService.loadLoggedInUserData();
        if (secureUserData) {
            return this._cbRightsService.hasSupportFeatureRights(this._secureStorageService.getSecureUserData);
        } else {
            return false;
        }
    }
}