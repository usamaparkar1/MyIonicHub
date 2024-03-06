import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbProductSelectionPage } from './cb-product-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CbProductSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbProductSelectionPageRoutingModule {}
