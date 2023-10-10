import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IntroGuard {

    storageService = inject(StorageService);
    routingService = inject(RoutingService);


    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const hasSeenIntro = await this.storageService.hasSeenIntro();
        
        if (hasSeenIntro) {
            this.routingService.goToLogin();
            return false;
        } else {
            return true;
        }
    }
}
