import { CbProductCardComponent } from './components/cb-product-card/cb-product-card.component';
import { CbFormFooterComponent } from './components/cb-form-footer/cb-form-footer.component';
import { CbFormInputComponent } from './components/cb-form-input/cb-form-input.component';
import { CbHeaderComponent } from './components/cb-header/cb-header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CbHeaderComponent,
        CbFormInputComponent,
        CbFormFooterComponent,
        CbProductCardComponent,
    ],
    exports: [
        CommonModule,
        CbHeaderComponent,
        CbFormInputComponent,
        CbFormFooterComponent,
        CbProductCardComponent,
    ]
})

export class CbSharedModule {}