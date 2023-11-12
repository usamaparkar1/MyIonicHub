import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

    
    constructor(
        private _routingService: RoutingService,
        private _authenticationService: AuthenticationService
    ) { }

    ngOnInit() {}

    async goToContractBooker() {
        await this._routingService.goToCbHome();
    }

    async logoutUser() {
        await this._authenticationService.logoutUser();
        await this._routingService.goToLogin();
    }
}
