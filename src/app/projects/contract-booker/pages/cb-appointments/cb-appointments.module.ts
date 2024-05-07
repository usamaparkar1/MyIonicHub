import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbAppointmentsPageRoutingModule } from './cb-appointments-routing.module';

import { CbAppointmentsPage } from './cb-appointments.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbAppointmentsPageRoutingModule
  ],
  declarations: [CbAppointmentsPage]
})
export class CbAppointmentsPageModule {}
