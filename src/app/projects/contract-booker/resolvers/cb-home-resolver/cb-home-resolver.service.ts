import { CbContractService, Contract } from 'src/app/projects/contract-booker/services/contract/cb-contract.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CbHomeResolverService {

    constructor(private _cbContractService: CbContractService) {}

    resolve: ResolveFn<Observable<Contract[] | undefined>> = async (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Observable<Contract[] | undefined>> => {
        return of(await this._cbContractService.loadAllContractsFromStorage());
    }
}