import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private _router: Router,
  ) { }

  async goToPage(url: string, navigationExtras: NavigationExtras) {
    await this._router.navigateByUrl(url, navigationExtras)
  }

  async goToIntroduction(navigationExtras: NavigationExtras = {}) {
    this.goToPage('introduction', navigationExtras);
  }

  async goToScreenLoader(navigationExtras: NavigationExtras = {}) {
    this.goToPage('screen-loader', navigationExtras);
  }
}
