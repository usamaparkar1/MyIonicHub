import { CbContractService } from 'src/app/projects/contract-booker/services/contract/cb-contract.service';
import { CbAppointmentsService } from '../../services/cb-appointments/cb-appointments.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { CbHomeService } from '../../services/home/cb-home.service';
import { CbNewsService } from '../../services/news/cb-news.service';
import { CbHomePageLink } from '../../models/cb-home-page-link';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CbHomeResolverService {

    constructor(
        private _cbNewsService: CbNewsService,
        private _cbHomeService: CbHomeService,
        private _cbContractService: CbContractService,
        private _cbAppointmentsService: CbAppointmentsService
    ) {}

    resolve: ResolveFn<Observable<CbHomePageLink[] | undefined>> = async (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Observable<CbHomePageLink[] | undefined>> => {
        const news = await this._cbNewsService.loadInitialNews();
        const appoinments = await this._cbAppointmentsService.loadAllAppointments();
        const contracts = await this._cbContractService.loadAllContractsFromStorage();

        return of(this._cbHomeService.loadHomeModules(
            news.length ?? 0,
            appoinments?.length ?? 0,
            contracts.length ?? 0
        ));
    }
}