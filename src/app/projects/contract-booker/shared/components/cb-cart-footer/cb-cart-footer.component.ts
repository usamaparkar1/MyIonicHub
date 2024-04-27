import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'cb-cart-footer',
    imports: [CommonModule, IonicModule],
    templateUrl: './cb-cart-footer.component.html',
    styleUrls: ['./cb-cart-footer.component.scss'],
})

export class CbCartFooterComponent  implements OnInit {

    constructor() { }

    ngOnInit() {}

}
