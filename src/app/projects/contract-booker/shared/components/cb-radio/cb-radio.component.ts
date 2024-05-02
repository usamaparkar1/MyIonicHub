import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'cb-radio',
    imports: [CommonModule, IonicModule, FormsModule],
    templateUrl: './cb-radio.component.html',
    styleUrls: ['./cb-radio.component.scss'],
})

export class CbRadioComponent  implements OnInit {

    @Input() value!: string | boolean;
    @Input() labelText!: string;
    @Input() labelPlacement!: string;

    constructor() { }

    ngOnInit() {}
}
