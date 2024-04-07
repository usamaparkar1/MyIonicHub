import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbPriceComparisonPageRoutingModule } from './cb-price-comparison-routing.module';

import { CbPriceComparisonPage } from './cb-price-comparison.page';
import { TranslateModule } from '@ngx-translate/core';
import { CbSharedModule } from '../../shared/cb-shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbPriceComparisonPageRoutingModule
  ],
  declarations: [CbPriceComparisonPage]
})
export class CbPriceComparisonPageModule {}
