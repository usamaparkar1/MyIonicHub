import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbAddContractPageRoutingModule } from './cb-add-contract-routing.module';

import { CbAddContractPage } from './cb-add-contract.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbAddContractPageRoutingModule
  ],
  declarations: [CbAddContractPage]
})
export class CbAddContractPageModule {}
