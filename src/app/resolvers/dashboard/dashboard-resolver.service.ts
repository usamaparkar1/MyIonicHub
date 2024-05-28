import { SecureStorageService } from 'src/app/services/secure-storage/secure-storage.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { alertHelpers } from 'src/app/helpers/alert-helpers';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DashboardResolverService {

    constructor(
        private _alertService: AlertService,
        private _projectsService: ProjectsService,
        private _translateService: TranslateService,
        private _secureStorageService: SecureStorageService,
    ) { }

    resolve: ResolveFn<void> = async (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<void> => {
        try {
            const userData = await this._secureStorageService.loadLoggedInUserData();
            if (userData) {
                await this._projectsService.loadAllProjects(this._secureStorageService.getSecureUserData);
            }
        } catch (error) {
            this._alertService.showAlert(
                alertHelpers.couldNotLoadLoggedInUserData,
                this._translateService.instant('CORE.ERROR'),
                this._translateService.instant('DASHBOARD.COULD_NOT_LOAD_USER')
            );
            throw error;
        }
    }
}
