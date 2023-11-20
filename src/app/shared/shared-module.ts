import { ContentLoaderComponent } from './components/content-loader/content-loader.component';
import { FormFooterComponent } from './components/form/form-footer/form-footer.component';
import { FormInputComponent } from './components/form/form-input/form-input.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SearchbarComponent,
        FormInputComponent,
        FormFooterComponent,
        ContentLoaderComponent,
    ],
    exports: [
        CommonModule,
        SearchbarComponent,
        FormInputComponent,
        FormFooterComponent,
        ContentLoaderComponent,
    ]
})

export class SharedModule {}