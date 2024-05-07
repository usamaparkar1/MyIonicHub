import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { Contract } from '../../models/cb-contract';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CbContractResolverService {

    constructor(private _cbContractService: CbContractService) {}

    resolve: ResolveFn<Observable<Contract | undefined>> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable <Contract | undefined> => {
        const contractId = route.params['id'];
        return of(this._cbContractService.getContractById(contractId));
    }
}
