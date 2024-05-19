import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CbContractGuard {

    constructor(private _cbContractService: CbContractService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const contractId = route.params['id'];
        if (contractId?.length) {
            const contractExists = this._cbContractService.getContractById(contractId);
            return contractExists?.id ? true : false;
        } else {
            return false;
        }
    }
}
