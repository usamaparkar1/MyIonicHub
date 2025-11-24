import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'hub-form-input',
    imports: [CommonModule, IonicModule],
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.scss']
})

export class FormInputComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
