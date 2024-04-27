import { CbConsumptionInputComponent } from './components/cb-consumption-input/cb-consumption-input.component';
import { CbProductCardComponent } from './components/cb-product-card/cb-product-card.component';
import { CbCartFooterComponent } from './components/cb-cart-footer/cb-cart-footer.component';
import { CbFormFooterComponent } from './components/cb-form-footer/cb-form-footer.component';
import { CbFormInputComponent } from './components/cb-form-input/cb-form-input.component';
import { CbCartItemComponent } from './components/cb-cart-item/cb-cart-item.component';
import { CbHeaderComponent } from './components/cb-header/cb-header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CbHeaderComponent,
        CbCartItemComponent,
        CbFormInputComponent,
        CbFormFooterComponent,
        CbCartFooterComponent,
        CbProductCardComponent,
        CbConsumptionInputComponent,
    ],
    exports: [
        CommonModule,
        CbHeaderComponent,
        CbCartItemComponent,
        CbFormInputComponent,
        CbFormFooterComponent,
        CbCartFooterComponent,
        CbProductCardComponent,
        CbConsumptionInputComponent,
    ]
})

export class CbSharedModule {}