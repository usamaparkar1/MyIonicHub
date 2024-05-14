import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import miscellaneousJson from 'src/assets/json-data/projects/miscellaneous/miscellaneous-data.json';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SlideService {

    private _introductionSlides: SlidesModel[] = [
        {
            "title": "INTRODUCTION.SLIDE_1.HEADER",
            "imageUrl": coreDataJson.introductionIconUrl
        },
        {
            "title": this._translateService.instant('APPS.CONTRACT_BOOKER.DESCRIPTION'),
            "imageUrl": contractBookerJson.appIcon
        },
        {
            "title": this._translateService.instant('APPS.MISCELLANEOUS.DESCRIPTION'),
            "imageUrl": miscellaneousJson.appIcon
        },
    ];

    constructor(
        private _translateService: TranslateService
    ) { }

    async getSlides(): Promise<SlidesModel[]> {
        return this._introductionSlides;
    }
}

export class SlidesModel implements ISlidesModel {
    title: string;
    imageUrl: string;
  
    constructor(slidesModel: SlidesModel) {
        this.title = slidesModel.title;
        this.imageUrl = slidesModel.imageUrl;
    }
}
  
export interface ISlidesModel {
    title: string;
    imageUrl: string;
}
  