import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbHomePage } from './cb-home.page';

const routes: Routes = [
  {
    path: '',
    component: CbHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbHomePageRoutingModule {}
