import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbNewsPage } from './cb-news.page';

const routes: Routes = [
  {
    path: '',
    component: CbNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbNewsPageRoutingModule {}
