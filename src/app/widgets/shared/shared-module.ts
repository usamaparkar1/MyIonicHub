import { FormFooterComponent } from './components/form/form-footer/form-footer.component';
import { FormInputComponent } from './components/form/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormInputComponent, FormFooterComponent],
    exports: [CommonModule, FormInputComponent, FormFooterComponent]
})

export class SharedModule {}