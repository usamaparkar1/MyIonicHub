import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbProductDetailsPage } from './cb-product-details.page';

const routes: Routes = [
  {
    path: '',
    component: CbProductDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbProductDetailsPageRoutingModule {}
