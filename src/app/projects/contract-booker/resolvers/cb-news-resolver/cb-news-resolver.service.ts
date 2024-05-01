import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CbNewsService } from '../../services/news/cb-news.service';
import { CbNews } from '../../models/cb-news';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CbNewsResolverService {

    constructor(private _cbNewsService: CbNewsService) { }

    resolve: ResolveFn<Observable<CbNews[]>> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<CbNews[]> => {
        return of(this._cbNewsService.loadNews());
    }
}
