import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'cb-header',
    imports: [CommonModule, IonicModule],
    templateUrl: './cb-header.component.html',
    styleUrls: ['./cb-header.component.scss'],
})

export class CbHeaderComponent  implements OnInit {

    @Input() isTranslucent: boolean = true;
    
    constructor() { }

    ngOnInit() {}

}
