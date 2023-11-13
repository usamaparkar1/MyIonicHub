import { ContentLoaderComponent } from './components/content-loader/content-loader.component';
import { FormFooterComponent } from './components/form/form-footer/form-footer.component';
import { FormInputComponent } from './components/form/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormInputComponent, FormFooterComponent, ContentLoaderComponent],
    exports: [CommonModule, FormInputComponent, FormFooterComponent, ContentLoaderComponent]
})

export class SharedModule {}