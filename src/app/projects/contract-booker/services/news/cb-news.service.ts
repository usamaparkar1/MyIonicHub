import newsJson from 'src/assets/json-data/projects/contract-booker/news.json';
import { CbNews } from '../../models/cb-news';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CbNewsService {

    private _batchSize: number = 10;
    private _currentBatchIndex: number = 0;
    
    newsData = newsJson;
    allNewsLoaded: boolean = true;
    news: BehaviorSubject<CbNews[]> = new BehaviorSubject<CbNews[]>([]);

    constructor() { }

    get allNews(): CbNews[] {
        return this.news.getValue();
    }

    loadInitialNews(): CbNews[] {
        this._currentBatchIndex = 0;
        this.news.next(this._getNextBatch());
        return this.allNews;
    }

    loadMoreNews(): CbNews[] {
        const currentBatch = this._getNextBatch();
        const existingNews = this.news.getValue();
        this.news.next([...existingNews, ...currentBatch]);
        return this.allNews;
    }

    private _getNextBatch(): CbNews[] {
        const nextBatch = this.newsData.news.slice(
            this._currentBatchIndex, 
            this._currentBatchIndex + this._batchSize
        );

        this.allNewsLoaded = nextBatch?.length < this._batchSize;
        this._currentBatchIndex += this._batchSize;
        return nextBatch;
    }
}
