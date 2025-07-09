import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbSupportPage } from './cb-support.page';

const routes: Routes = [
  {
    path: '',
    component: CbSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbSupportPageRoutingModule {}
