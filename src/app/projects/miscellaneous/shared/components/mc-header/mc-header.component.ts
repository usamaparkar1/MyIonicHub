import { Component, Input, OnInit } from '@angular/core';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-mc-header',
    imports: [IonicModule],
    templateUrl: './mc-header.component.html',
    styleUrls: ['./mc-header.component.scss']
})

export class McHeaderComponent  implements OnInit {
    
    @Input() isTranslucent: boolean = true;

    constructor() { }

    ngOnInit() {}

}
