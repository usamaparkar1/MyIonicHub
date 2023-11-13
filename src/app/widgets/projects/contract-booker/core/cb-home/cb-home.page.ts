import { CbRoutingService } from 'src/app/widgets/projects/contract-booker/services/routing/cb-routing.service';
import contractBookerJson from 'src/assets/json-data/contract-booker-data.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cb-home',
  templateUrl: './cb-home.page.html',
  styleUrls: ['./cb-home.page.scss'],
})

export class CbHomePage implements OnInit {

    contractBookerData = contractBookerJson;
    constructor(
        private _cbRoutingService: CbRoutingService
    ) {}

    ngOnInit() {}

    async startConsultation() {
        await this._cbRoutingService.goToCbCustomerAddress();
    }
}
