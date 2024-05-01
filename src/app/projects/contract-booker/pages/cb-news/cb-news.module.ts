import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbNewsPageRoutingModule } from './cb-news-routing.module';

import { CbNewsPage } from './cb-news.page';
import { CbSharedModule } from '../../shared/cb-shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbSharedModule,
    TranslateModule,
    CbNewsPageRoutingModule
  ],
  declarations: [CbNewsPage]
})
export class CbNewsPageModule {}
