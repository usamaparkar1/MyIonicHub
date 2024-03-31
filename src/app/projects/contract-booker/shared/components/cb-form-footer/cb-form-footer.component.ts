import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'cb-form-footer',
    imports: [CommonModule, IonicModule],
    templateUrl: './cb-form-footer.component.html',
    styleUrls: ['./cb-form-footer.component.scss'],
})
export class CbFormFooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
