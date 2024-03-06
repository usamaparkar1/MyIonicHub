import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbProductSelectionPageRoutingModule } from './cb-product-selection-routing.module';

import { CbProductSelectionPage } from './cb-product-selection.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbProductSelectionPageRoutingModule
  ],
  declarations: [CbProductSelectionPage]
})
export class CbProductSelectionPageModule {}
