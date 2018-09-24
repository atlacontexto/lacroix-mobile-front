import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningDetailPage } from './planning-detail';

@NgModule({
  declarations: [
    PlanningDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningDetailPage),
  ],
})
export class PlanningDetailPageModule {}
