import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import contractBookerJson from 'src/assets/json-data/contract-booker-data.json';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

    isLoadingContent: boolean = true;
    contractBookerData = contractBookerJson;

    constructor(
        private _routingService: RoutingService,
        private _authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this._dashboardInit();
    }

    private _dashboardInit() {
        this.showLoadingContent(false);
    }

    showLoadingContent(value: boolean) {
        this.isLoadingContent = value;
    }

    async goToContractBooker() {
        await this._routingService.goToCbHome();
    }

    async logoutUser() {
        await this._authenticationService.logoutUser();
        await this._routingService.goToLogin();
    }
}
