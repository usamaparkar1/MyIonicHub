import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouteNotFoundPageRoutingModule } from './route-not-found-routing.module';

import { RouteNotFoundPage } from './route-not-found.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouteNotFoundPageRoutingModule
  ],
  declarations: [RouteNotFoundPage]
})
export class RouteNotFoundPageModule {}
