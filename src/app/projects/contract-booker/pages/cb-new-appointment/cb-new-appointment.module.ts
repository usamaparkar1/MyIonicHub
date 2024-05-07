import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbNewAppointmentPageRoutingModule } from './cb-new-appointment-routing.module';

import { CbNewAppointmentPage } from './cb-new-appointment.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    ReactiveFormsModule,
    CbNewAppointmentPageRoutingModule
  ],
  declarations: [CbNewAppointmentPage]
})
export class CbNewAppointmentPageModule {}
