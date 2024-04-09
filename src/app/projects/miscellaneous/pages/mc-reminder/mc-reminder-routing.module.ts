import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { McReminderPage } from './mc-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: McReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class McReminderPageRoutingModule {}
