import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { McReminderPageRoutingModule } from './mc-reminder-routing.module';

import { McReminderPage } from './mc-reminder.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    McReminderPageRoutingModule
  ],
  declarations: [McReminderPage]
})
export class McReminderPageModule {}
