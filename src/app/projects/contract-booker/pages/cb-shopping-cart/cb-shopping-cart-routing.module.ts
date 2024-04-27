import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbShoppingCartPage } from './cb-shopping-cart.page';

const routes: Routes = [
  {
    path: '',
    component: CbShoppingCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbShoppingCartPageRoutingModule {}
