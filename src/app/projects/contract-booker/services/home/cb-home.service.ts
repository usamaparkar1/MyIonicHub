import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { CbHomePageLink } from '../../models/cb-home-page-link';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CbHomeService {

    homeModules: BehaviorSubject<CbHomePageLink[]> = new BehaviorSubject<CbHomePageLink[]>([]);
    contractBookerData = contractBookerJson;

    constructor() { }

    loadHomeModules(
        newsCount: number,
        appoinmentsCount: number,
        contractsCount: number
    ): CbHomePageLink[] {
        const newHomeLinks = [...this.contractBookerData.cbHomeModules];

        newHomeLinks.forEach((homeLink) => {
            if (homeLink.id === 1) {
                homeLink.count = newsCount;
            } else if (homeLink.id === 2) {
                homeLink.count = appoinmentsCount;
            } else if (homeLink.id === 3) {
                homeLink.count = contractsCount;
            }
        });

        this.homeModules.next(newHomeLinks);
        return this.homeModules.getValue();
    }

}
