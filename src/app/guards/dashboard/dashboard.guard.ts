import { SecureStorageService } from 'src/app/services/secure-storage/secure-storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppHelperService } from 'src/app/services/app-helper/app-helper.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DashboardGuard {

    constructor(
        private _routingService: RoutingService,
        private _projectsService: ProjectsService,
        private _appHelperService: AppHelperService,
        private _secureStorageService: SecureStorageService,
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (this._appHelperService.isUserLoggedIn) {
            const response = await this._secureStorageService.loadLoggedInUserData();
            if (response) {
                this._projectsService.loadAllProjects(this._secureStorageService.getSecureUserData);
                return true;
            } else {
                return false;
            }
        } else {
            this._routingService.goToLogin();
            return false;
        }
    }
}
