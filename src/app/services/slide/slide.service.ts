import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SlideService {

    private _mockSlides: SlidesModel[] = [
        {
            title: 'INTRODUCTION.SLIDE_1.HEADER'
        },
        {
            title: 'INTRODUCTION.SLIDE_2.HEADER'
        }
    ]

    constructor() { }

    async getSlides(): Promise<SlidesModel[]> {
        return this._mockSlides;
    }
}

export class SlidesModel implements ISlidesModel {
    title: string | undefined;
  
    constructor(slidesModel?: SlidesModel) {
      this.title = undefined;
    }
}
  
export interface ISlidesModel {
    title: string | undefined;
}
  