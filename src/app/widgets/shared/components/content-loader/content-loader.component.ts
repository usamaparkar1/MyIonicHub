import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'hub-content-loader',
    imports: [CommonModule, IonicModule],
    templateUrl: './content-loader.component.html',
    styleUrls: ['./content-loader.component.scss'],
})
export class ContentLoaderComponent  implements OnInit {

    constructor() { }

    ngOnInit() {}
}
