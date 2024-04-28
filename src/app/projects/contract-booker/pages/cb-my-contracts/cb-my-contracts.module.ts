import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbMyContractsPageRoutingModule } from './cb-my-contracts-routing.module';

import { CbMyContractsPage } from './cb-my-contracts.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbMyContractsPageRoutingModule
  ],
  declarations: [CbMyContractsPage]
})
export class CbMyContractsPageModule {}
