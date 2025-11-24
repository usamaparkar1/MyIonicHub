import { Component, Input, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'cb-radio',
    imports: [IonicModule, FormsModule],
    templateUrl: './cb-radio.component.html',
    styleUrls: ['./cb-radio.component.scss']
})

export class CbRadioComponent  implements OnInit {

    @Input() value!: string | boolean;
    @Input() labelText!: string;
    @Input() labelPlacement!: string;

    constructor() { }

    ngOnInit() {}
}
