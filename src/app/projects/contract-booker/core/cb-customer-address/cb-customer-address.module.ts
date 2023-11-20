import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbCustomerAddressPageRoutingModule } from './cb-customer-address-routing.module';

import { CbCustomerAddressPage } from './cb-customer-address.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    CbCustomerAddressPageRoutingModule
  ],
  declarations: [CbCustomerAddressPage]
})
export class CbCustomerAddressPageModule {}
