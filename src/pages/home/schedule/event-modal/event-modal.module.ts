import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventModalPage } from './event-modal';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    EventModalPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(EventModalPage),
  ],
})
export class EventModalPageModule {}
