import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbAppointmentsPage } from './cb-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: CbAppointmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbAppointmentsPageRoutingModule {}