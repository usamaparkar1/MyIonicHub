import { ProfileHeaderComponent } from 'src/app/shared/components/profile-header/profile-header.component';
import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { CbContractService } from '../../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../../services/routing/cb-routing.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Contract } from '../../../models/cb-contract';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    standalone: true,
    selector: 'cb-header',
    imports: [CommonModule, IonicModule, ProfileHeaderComponent],
    templateUrl: './cb-header.component.html',
    styleUrls: ['./cb-header.component.scss'],
})

export class CbHeaderComponent  implements OnInit, OnDestroy {

    @Input() isTranslucent: boolean = false;
    @Input() isSecondHeader: boolean = false;
    @Input() collapseValue: string | undefined = undefined;

    contracts: Contract[] = [];
    contractsSubscription!: Subscription;
    contractBookerData = contractBookerJson;
    
    constructor(
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService
    ) { }

    ngOnInit() {
        this._initCbHomePage();
    }

    private async _initCbHomePage() {
        this.contractsSubscription = this._cbContractService.contracts.subscribe((contracts) => {
            this.contracts = contracts;
        });
    }

    ngOnDestroy() {
        this.contractsSubscription.unsubscribe();
    }

    isCartCountGreaterThanZero() {
        return this.contracts?.length > 0;
    }

    openShoppingCart() {
        this._cbRoutingService.goToCbShoppingCart();
    }
}
