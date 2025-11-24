import { CbNewsService } from '../../services/news/cb-news.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { CbNews } from '../../models/cb-news';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cb-news',
    templateUrl: './cb-news.page.html',
    styleUrls: ['./cb-news.page.scss'],
    standalone: false
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
        this._markNewsAsRead(news);
    }

    /** @description Set news as isRead to true if it's not already true. */
    private _markNewsAsRead(news: CbNews) {
        if (!news.isRead) {
            news.isRead = true;
        }
    }

    loadMoreNews(event: any) {
        setTimeout(() => {
            this._cbNewsService.loadMoreNews();
            (event as InfiniteScrollCustomEvent).target.complete();
        }, 500);
    }

    allNewsLoaded(): boolean {
        return this._cbNewsService.allNewsLoaded;
    }
}
