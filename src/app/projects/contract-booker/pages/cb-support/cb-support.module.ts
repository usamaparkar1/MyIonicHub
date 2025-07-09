import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbSupportPageRoutingModule } from './cb-support-routing.module';

import { CbSupportPage } from './cb-support.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbSupportPageRoutingModule
  ],
  declarations: [CbSupportPage]
})
export class CbSupportPageModule {}
