import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenLoaderPageRoutingModule } from './screen-loader-routing.module';

import { ScreenLoaderPage } from './screen-loader.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ScreenLoaderPageRoutingModule
  ],
  declarations: [ScreenLoaderPage]
})
export class ScreenLoaderPageModule {}
