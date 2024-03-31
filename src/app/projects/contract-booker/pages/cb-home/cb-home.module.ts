import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbHomePageRoutingModule } from './cb-home-routing.module';

import { CbHomePage } from './cb-home.page';
import { TranslateModule } from '@ngx-translate/core';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CbSharedModule,
    TranslateModule,
    CbHomePageRoutingModule
  ],
  declarations: [CbHomePage]
})
export class CbHomePageModule {}
