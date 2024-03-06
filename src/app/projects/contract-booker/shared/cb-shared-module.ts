import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CbHeaderComponent } from './components/cb-header/cb-header.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CbHeaderComponent
    ],
    exports: [
        CommonModule,
        CbHeaderComponent
    ]
})

export class CbSharedModule {}