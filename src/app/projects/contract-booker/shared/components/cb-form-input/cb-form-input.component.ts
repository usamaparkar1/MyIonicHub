import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'cb-form-input',
    imports: [CommonModule, IonicModule],
    templateUrl: './cb-form-input.component.html',
    styleUrls: ['./cb-form-input.component.scss'],
})
export class CbFormInputComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
