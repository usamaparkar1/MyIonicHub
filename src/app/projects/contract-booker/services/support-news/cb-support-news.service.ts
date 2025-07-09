import { CbNewsService } from '../news/cb-news.service';
import { CbNews } from '../../models/cb-news';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CbSupportNewsService {

    constructor(private _cbNewsService: CbNewsService) { }

    getNewsSuggestionsReponse(): CbNews[] {
        const news = this._cbNewsService.allNews;

        const readNews = this.findReadNews(news);

        if (readNews.length > 0) {
            const topThreeReadNews = this.getTopThreeReadNewsByDate(readNews);
            
            if (topThreeReadNews.length > 0) {
                return topThreeReadNews;
            }
        }

        const topFiveNews = this.getNumberOfNews(news, 5);

        return topFiveNews;
    }

    findReadNews(news: CbNews[]) : CbNews[] {
        return news.filter((n) => n.isRead);
    }

    getTopThreeReadNewsByDate(readNews: CbNews[]) {
        // Sort the read news by CreateDate
        const sortedNews = readNews.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());

        // Get the top three read news
        const topThreeReadNews = this.getNumberOfNews(sortedNews, 3);

        return topThreeReadNews;
    }

    getNumberOfNews(news: CbNews[], numberOfNews: number) {
        return news.slice(0, numberOfNews);
    }
}
