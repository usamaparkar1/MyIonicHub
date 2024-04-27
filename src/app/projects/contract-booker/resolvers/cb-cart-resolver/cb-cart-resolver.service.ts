import { CbContractService } from 'src/app/projects/contract-booker/services/contract/cb-contract.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { Contract } from '../../models/cb-contract';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CbCartResolverService {

    constructor(private _cbContractService: CbContractService) {}

    resolve: ResolveFn<Observable<Contract[] | undefined>> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Contract[] | undefined> => {
        return of(this._cbContractService.allContracts);
    }
}
