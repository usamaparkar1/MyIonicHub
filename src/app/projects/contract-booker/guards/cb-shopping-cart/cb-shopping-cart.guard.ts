import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CbShoppingCartGuard {

    constructor(private _cbContractService: CbContractService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._cbContractService.allContracts?.length > 0 ? true : false;
    }
}
