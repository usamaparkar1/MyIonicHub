import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbSignContractPageRoutingModule } from './cb-sign-contract-routing.module';

import { CbSignContractPage } from './cb-sign-contract.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbSignContractPageRoutingModule
  ],
  declarations: [CbSignContractPage]
})
export class CbSignContractPageModule {}
