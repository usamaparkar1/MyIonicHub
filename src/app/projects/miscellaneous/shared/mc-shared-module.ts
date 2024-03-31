import { McHeaderComponent } from './components/mc-header/mc-header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        McHeaderComponent,
    ],
    exports: [
        CommonModule,
        McHeaderComponent,
    ]
})

export class McSharedModule {}