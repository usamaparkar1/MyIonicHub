import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbMyContractsPage } from './cb-my-contracts.page';

const routes: Routes = [
  {
    path: '',
    component: CbMyContractsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbMyContractsPageRoutingModule {}
