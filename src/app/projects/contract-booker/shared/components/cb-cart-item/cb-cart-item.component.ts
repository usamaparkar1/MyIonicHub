import { CbContractService } from '../../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../../services/routing/cb-routing.service';
import { CbAlertService } from '../../../services/alert/cb-alert.service';
import { CbToastService } from '../../../services/toast/cb-toast.service';
import { cbToastHelpers } from '../../../helpers/cb-toast-helpers';
import { Component, Input, OnInit } from '@angular/core';
import { Contract } from '../../../models/cb-contract';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'cb-cart-item',
    imports: [CommonModule, IonicModule, TranslateModule],
    templateUrl: './cb-cart-item.component.html',
    styleUrls: ['./cb-cart-item.component.scss'],
})

export class CbCartItemComponent  implements OnInit {

    @Input() contract!: Contract;
    @Input() cIndex!: number;

    constructor(
        private _cbAlertService: CbAlertService,
        private _cbToastService: CbToastService,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService
    ) {}
    
    ngOnInit() {
    }

    editCartItem() {
        this._cbRoutingService.goToCbProductDetails(this.contract.id);
    }

    async deleteCartItemClicked() {
        const removeStatus = await this._cbContractService.removeContractOnCartDelete(this.contract);

        if (removeStatus.success) {
            this._cbToastService.showToast({
                id: cbToastHelpers.cartItemRemoved,
                message: removeStatus.message
            });
        } else {
            this._cbAlertService.showAlertForContractNotRemoved(removeStatus.message);
        }
    }
}
