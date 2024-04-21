import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbProductDetailsPageRoutingModule } from './cb-product-details-routing.module';

import { CbProductDetailsPage } from './cb-product-details.page';
import { TranslateModule } from '@ngx-translate/core';
import { CbHeaderComponent } from '../../shared/components/cb-header/cb-header.component';
import { CbConsumptionInputComponent } from '../../shared/components/cb-consumption-input/cb-consumption-input.component';
import { CbFormFooterComponent } from '../../shared/components/cb-form-footer/cb-form-footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CbHeaderComponent,
    CbFormFooterComponent,
    CbConsumptionInputComponent,
    CbProductDetailsPageRoutingModule
  ],
  declarations: [CbProductDetailsPage]
})
export class CbProductDetailsPageModule {}
