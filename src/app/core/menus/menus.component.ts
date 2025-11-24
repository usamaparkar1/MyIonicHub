import { CbMenuComponent } from 'src/app/projects/contract-booker/menu/cb-menu/cb-menu.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-menus',
    imports: [CommonModule, IonicModule, CbMenuComponent],
    templateUrl: './menus.component.html',
    styleUrls: ['./menus.component.scss']
})

export class MenusComponent  implements OnInit {

    constructor() { }

    ngOnInit() {}
}
