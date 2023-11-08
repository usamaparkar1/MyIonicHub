import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbHomePageRoutingModule } from './cb-home-routing.module';

import { CbHomePage } from './cb-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbHomePageRoutingModule
  ],
  declarations: [CbHomePage]
})
export class CbHomePageModule {}
