import { SecureStorageService } from 'src/app/services/secure-storage/secure-storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CbSupportService } from '../../services/support/cb-support.service';
import { CbRightsService } from '../../services/rights/cb-rights.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CbSupportGuard {

    constructor(
        private _cbRightsService: CbRightsService,
        private _cbSupportService: CbSupportService,
        private _secureStorageService: SecureStorageService
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const secureUserData = await this._secureStorageService.loadLoggedInUserData();
        if (secureUserData) {
            const isSupportFeatureEnabled = this._cbRightsService.hasSupportFeatureRights(this._secureStorageService.getSecureUserData);

            if (isSupportFeatureEnabled) {
                this._cbSupportService.loadSuggestions([]);

                return true;
            }
        }

        return false;
    }
}