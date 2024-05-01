import { CbMyContractsService } from '../../services/my-contracts/cb-my-contracts.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Contract } from '../../models/cb-contract';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CbMyContractsResolverService {

    constructor(
        private _cbMyContractsService: CbMyContractsService
    ) { }

    resolve: ResolveFn<Observable<Contract[] | undefined>> = async (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Observable<Contract[] | undefined>> => {
        return of(await this._cbMyContractsService.loadAllSavedContracts())
    }
}
