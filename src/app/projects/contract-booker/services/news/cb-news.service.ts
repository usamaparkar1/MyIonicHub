import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { CbNews } from '../../models/cb-news';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CbNewsService {

    news: BehaviorSubject<CbNews[]> = new BehaviorSubject<CbNews[]>([]);
    contractBookerData = contractBookerJson;

    constructor() { }

    get allNews(): CbNews[] {
        return this.news.getValue();
    }

    loadNews(): CbNews[] {
        this.news.next(this.contractBookerData.news);
        return this.allNews;
    }
}
