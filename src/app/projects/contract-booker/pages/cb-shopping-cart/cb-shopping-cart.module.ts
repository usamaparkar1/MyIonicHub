import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbShoppingCartPageRoutingModule } from './cb-shopping-cart-routing.module';

import { CbShoppingCartPage } from './cb-shopping-cart.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbShoppingCartPageRoutingModule
  ],
  declarations: [CbShoppingCartPage]
})
export class CbShoppingCartPageModule {}
