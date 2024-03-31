import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { CbContractService, Contract } from '../../services/contract/cb-contract.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContractResolverService {

    constructor(private _cbContractService: CbContractService) {}

    resolve: ResolveFn<Observable<Contract | undefined>> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable <Contract | undefined> => {
        return of(this._cbContractService.getLastUsedContract());
    }
}
