import { CbUserRights } from 'src/app/projects/contract-booker/enums/cb-user-rights';
import { SecureUserModel } from 'src/app/models/secure-user';
import { UserRights } from 'src/app/enum/user-rights';
import { Rights } from 'src/app/models/user';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RightsService {

    constructor() { }

    getMasterUserRights(): Rights[] {
        return [
            UserRights.HasContractBookerRights,
            UserRights.HasMiscellaneousAppRights,
            CbUserRights.HasNewsModuleRights,
            CbUserRights.HasDocumentsModuleRights,
            CbUserRights.HasAppointmentsModuleRights,
            CbUserRights.HasMyContractModuleRights,
            CbUserRights.HasContractCreationRights,
        ];
    }

    getAuthenticatedUserRights(): Rights[] {
        return [
            UserRights.HasContractBookerRights,
            CbUserRights.HasNewsModuleRights,
            CbUserRights.HasDocumentsModuleRights,
            CbUserRights.HasAppointmentsModuleRights,
            CbUserRights.HasMyContractModuleRights,
            CbUserRights.HasContractCreationRights,
        ];
    }

    hasContractBookerAccessRights(secureUserModel: SecureUserModel | null): boolean {
        return secureUserModel && secureUserModel?.rights?.length > 0
        ? secureUserModel.rights.includes(UserRights.HasContractBookerRights)
        : false;
    }

    hasMiscellaneousAppAccessRights(secureUserModel: SecureUserModel | null): boolean {
        return secureUserModel && secureUserModel?.rights?.length > 0
        ? secureUserModel.rights.includes(UserRights.HasMiscellaneousAppRights) 
        : false;
    }
}
