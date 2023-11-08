import { RoutingService } from 'src/app/services/routing/routing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

    
    constructor(
        private _routingService: RoutingService
    ) { }

    ngOnInit() {}

    goToContractBooker() {
        this._routingService.goToCbHome();
    }
}
