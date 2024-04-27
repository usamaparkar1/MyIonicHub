import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbAddContractPage } from './cb-add-contract.page';

const routes: Routes = [
  {
    path: '',
    component: CbAddContractPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbAddContractPageRoutingModule {}
