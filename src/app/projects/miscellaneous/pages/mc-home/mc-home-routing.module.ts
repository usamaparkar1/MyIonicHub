import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { McHomePage } from './mc-home.page';

const routes: Routes = [
  {
    path: '',
    component: McHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class McHomePageRoutingModule {}
