import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningListPage } from './planning-list';

@NgModule({
  declarations: [
    PlanningListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningListPage),
  ],
})
export class PlanningListPageModule {}
