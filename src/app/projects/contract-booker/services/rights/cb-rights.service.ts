import { SecureUserModel } from 'src/app/models/secure-user';
import { CbUserRights } from '../../enums/cb-user-rights';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CbRightsService {

    constructor() { }

    hasSupportFeatureRights(secureUserModel: SecureUserModel | null): boolean {
        return secureUserModel && secureUserModel?.rights?.length > 0
        ? secureUserModel.rights.includes(CbUserRights.HasSupportFeatureRights) 
        : false;
    }
}
