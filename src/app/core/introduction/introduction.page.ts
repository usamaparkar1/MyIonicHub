import { SlideService, SlidesModel } from 'src/app/services/slide/slide.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})

export class IntroductionPage implements OnInit {

    showSkip: boolean = true;
    slides: SlidesModel[] = [];
    currentSlideIndex: number = 0;

    constructor(
        private _slideService: SlideService,
        private _routingService: RoutingService,
        private _storageService: StorageService,
    ) {}

    ngOnInit() {
        this.setupSlides();
    }

    async setupSlides() {
        this.slides = await this._slideService.getSlides();
    }

    onSlideChange(event: any) { 
        this.currentSlideIndex = event?.detail[0]?.activeIndex;
    }

    async completeIntroduction() {
        // Skip can be clicked from the end of the slides or from the floating skip button
        await this._storageService.setUserHasSeenIntroInStorage();
        await this._routingService.goToLogin();
    }
}
