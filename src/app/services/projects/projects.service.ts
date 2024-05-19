import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import miscellaneousJson from 'src/assets/json-data/projects/miscellaneous/miscellaneous-data.json';
import { SecureUserModel } from 'src/app/models/secure-user';
import { RightsService } from '../rights/rights.service';
import { TranslateService } from '@ngx-translate/core';
import { Projects } from 'src/app/models/projects';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProjectsService {

    private _allProjectsSubject: BehaviorSubject<Projects[]> = new BehaviorSubject<Projects[]>([]);
    private _contractBookerData = contractBookerJson;
    private _miscellaneousData = miscellaneousJson;
    
    getAllProjects(): Observable<Projects[]> {
        return this._allProjectsSubject.asObservable();
    }

    constructor(
        private _rightsService: RightsService,
        private _translateService: TranslateService,
    ) { }

    loadAllProjects(getSecureUserData: SecureUserModel | null) {
        const newProjectData = [];
        
        if (this._rightsService.hasContractBookerAccessRights(getSecureUserData)) {
            newProjectData.push({
                appName: this._contractBookerData.appName,
                appDescription: this._translateService.instant('APPS.CONTRACT_BOOKER.DESCRIPTION'),
                projectIcon: {
                    altText: this._contractBookerData.appName,
                    svgSrc: this._contractBookerData.appIcon
                }
            });
        }

        if (this._rightsService.hasMiscellaneousAppAccessRights(getSecureUserData)) {
            newProjectData.push({
                appName: this._miscellaneousData.appName,
                appDescription: this._translateService.instant('APPS.MISCELLANEOUS.DESCRIPTION'),
                projectIcon: {
                    altText: this._miscellaneousData.appIconAlt,
                    svgSrc: this._miscellaneousData.appIcon
                }
            })
        }

        this._allProjectsSubject.next(newProjectData);
    }
}
