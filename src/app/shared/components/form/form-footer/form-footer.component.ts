import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'hub-form-footer',
    imports: [CommonModule, IonicModule],
    templateUrl: './form-footer.component.html',
    styleUrls: ['./form-footer.component.scss']
})

export class FormFooterComponent  implements OnInit {

    constructor() { }

    ngOnInit() {}

}
