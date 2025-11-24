import contractBookerJson from 'src/assets/json-data/projects/contract-booker/contract-booker-data.json';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/cb-product';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    imports: [
        IonicModule,
        CommonModule,
    ],
    selector: 'cb-product-card',
    templateUrl: './cb-product-card.component.html',
    styleUrls: ['./cb-product-card.component.scss']
})

export class CbProductCardComponent  implements OnInit {

    @Input() product!: Product;
    contractBookerData = contractBookerJson;
    
    constructor() { }

    ngOnInit() {}
}
