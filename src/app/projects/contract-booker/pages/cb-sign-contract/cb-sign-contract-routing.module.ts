import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbSignContractPage } from './cb-sign-contract.page';

const routes: Routes = [
  {
    path: '',
    component: CbSignContractPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbSignContractPageRoutingModule {}
