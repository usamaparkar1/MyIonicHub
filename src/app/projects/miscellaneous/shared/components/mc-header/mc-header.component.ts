import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-mc-header',
    imports: [CommonModule, IonicModule],
    templateUrl: './mc-header.component.html',
    styleUrls: ['./mc-header.component.scss']
})

export class McHeaderComponent  implements OnInit {
    
    @Input() isTranslucent: boolean = true;

    constructor() { }

    ngOnInit() {}

}
