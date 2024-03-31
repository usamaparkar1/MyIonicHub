import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbStandardConsultationPageRoutingModule } from './cb-standard-consultation-routing.module';

import { CbStandardConsultationPage } from './cb-standard-consultation.page';
import { TranslateModule } from '@ngx-translate/core';
import { CbSharedModule } from '../../shared/cb-shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbStandardConsultationPageRoutingModule
  ],
  declarations: [CbStandardConsultationPage]
})
export class CbStandardConsultationPageModule {}
