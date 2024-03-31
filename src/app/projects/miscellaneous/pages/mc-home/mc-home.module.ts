import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { McHomePageRoutingModule } from './mc-home-routing.module';

import { McHomePage } from './mc-home.page';
import { SharedModule } from 'src/app/shared/shared-module';
import { TranslateModule } from '@ngx-translate/core';
import { McSharedModule } from '../../shared/mc-shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    McSharedModule,
    TranslateModule,
    McHomePageRoutingModule
  ],
  declarations: [McHomePage]
})
export class McHomePageModule {}
