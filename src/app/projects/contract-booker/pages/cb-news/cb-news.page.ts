import { CbNewsService } from '../../services/news/cb-news.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CbNews } from '../../models/cb-news';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cb-news',
  templateUrl: './cb-news.page.html',
  styleUrls: ['./cb-news.page.scss'],
})

export class CbNewsPage implements OnInit, OnDestroy {

    private _newsSubscription!: Subscription;

    news: CbNews[] = [];

    constructor(
        private _cbNewsService: CbNewsService
    ) { }

    ngOnInit() {
        this._setupNewsPage();
    }

    private _setupNewsPage() {
        this._subscribeToNews();
    }

    ngOnDestroy() {
        this._newsSubscription.unsubscribe();
    }

    private _subscribeToNews() {
        this._newsSubscription = this._cbNewsService.news.subscribe((news) => {
            this.news = news;
        });
    }

    expandNewsItem(news: CbNews) {
        news.expanded = !news.expanded;
        if (!news.isRead) {
            news.isRead = true;
        }
    }
}
