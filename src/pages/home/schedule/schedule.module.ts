import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePage } from './schedule';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    SchedulePage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(SchedulePage),
  ],
})
export class SchedulePageModule {}
