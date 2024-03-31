import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteNotFoundPage } from './route-not-found.page';

const routes: Routes = [
  {
    path: '',
    component: RouteNotFoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteNotFoundPageRoutingModule {}
