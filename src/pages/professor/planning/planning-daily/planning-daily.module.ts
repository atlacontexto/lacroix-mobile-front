import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningDailyPage } from './planning-daily';

@NgModule({
  declarations: [
    PlanningDailyPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningDailyPage),
  ],
})
export class PlanningDailyPageModule {}
