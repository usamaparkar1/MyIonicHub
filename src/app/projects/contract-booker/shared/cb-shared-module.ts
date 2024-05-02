import { CbConsumptionInputComponent } from './components/cb-consumption-input/cb-consumption-input.component';
import { CbProductCardComponent } from './components/cb-product-card/cb-product-card.component';
import { CbFormFooter2Component } from './components/cb-form-footer-2/cb-form-footer-2.component';
import { CbFormFooterComponent } from './components/cb-form-footer/cb-form-footer.component';
import { CbFormInputComponent } from './components/cb-form-input/cb-form-input.component';
import { CbCartItemComponent } from './components/cb-cart-item/cb-cart-item.component';
import { CbHeaderComponent } from './components/cb-header/cb-header.component';
import { CbRadioComponent } from './components/cb-radio/cb-radio.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CbRadioComponent,
        CbHeaderComponent,
        CbCartItemComponent,
        CbFormInputComponent,
        CbFormFooterComponent,
        CbFormFooter2Component,
        CbProductCardComponent,
        CbConsumptionInputComponent,
    ],
    exports: [
        CommonModule,
        CbRadioComponent,
        CbHeaderComponent,
        CbCartItemComponent,
        CbFormInputComponent,
        CbFormFooterComponent,
        CbFormFooter2Component,
        CbProductCardComponent,
        CbConsumptionInputComponent,
    ]
})

export class CbSharedModule {}