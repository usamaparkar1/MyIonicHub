import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbPriceComparisonPage } from './cb-price-comparison.page';

const routes: Routes = [
  {
    path: '',
    component: CbPriceComparisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbPriceComparisonPageRoutingModule {}
