import { StorageService } from 'src/app/services//storage/storage.service';
import { localHelpers } from 'src/app/helpers/local-helpers';
import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/routing/routing.service';

@Component({
  selector: 'app-screen-loader',
  templateUrl: './screen-loader.page.html',
  styleUrls: ['./screen-loader.page.scss'],
})
export class ScreenLoaderPage implements OnInit {

  constructor(
    private _routingService: RoutingService,
    private _storageService: StorageService
  ) {}

  ngOnInit() {
    this._init();
  }

  private async _init() {
    const isAppSetupToken = await this._storageService.get(localHelpers.isAppSetup);

    if (isAppSetupToken) {
      await this._routingService.goToIntroduction();
      return;
    }

    await this.downloadFiles();
    await this._routingService.goToIntroduction();
  }

  async downloadFiles() {
    await this._storageService.set(localHelpers.isAppSetup, true);
  }

}
