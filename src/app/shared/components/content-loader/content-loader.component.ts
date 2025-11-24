import { Component, OnInit } from '@angular/core';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'hub-content-loader',
    imports: [IonicModule],
    templateUrl: './content-loader.component.html',
    styleUrls: ['./content-loader.component.scss']
})
export class ContentLoaderComponent  implements OnInit {

    constructor() { }

    ngOnInit() {}
}
