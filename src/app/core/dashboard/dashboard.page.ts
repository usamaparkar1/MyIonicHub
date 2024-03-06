import { CbRoutingService } from 'src/app/projects/contract-booker/services/routing/cb-routing.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import contractBookerJson from 'src/assets/json-data/contract-booker-data.json';
import { RoutingService } from 'src/app/services/routing/routing.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { CbRoutingHelpers } from 'src/app/helpers/routing-helpers';
import coreDataJson from 'src/assets/json-data/core-data.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

    isLoadingContent: boolean = true;
    contractBookerData = contractBookerJson;
    coreData = coreDataJson;

    constructor(
        private _storageService: StorageService,
        private _routingService: RoutingService,
        private _cbRoutingService: CbRoutingService,
        private _authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this._dashboardInit();
    }

    private _dashboardInit() {
        this._showLoadingContent(false);
    }

    private _showLoadingContent(value: boolean) {
        this.isLoadingContent = value;
    }

    async selectContractBookerApp() {
        await this._storageService.setCurrentAppInUse(CbRoutingHelpers.cbHome);
        await this.goToContractBooker();
    }

    async goToContractBooker() {
        await this._cbRoutingService.goToCbHome();
    }

    async logoutUser() {
        await this._authenticationService.logoutUser();
        await this._routingService.goToLogin();
    }
}
