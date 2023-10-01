import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenLoaderPage } from './screen-loader.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenLoaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenLoaderPageRoutingModule {}
