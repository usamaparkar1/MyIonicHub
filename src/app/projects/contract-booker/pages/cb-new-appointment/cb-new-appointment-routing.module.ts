import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbNewAppointmentPage } from './cb-new-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: CbNewAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbNewAppointmentPageRoutingModule {}
