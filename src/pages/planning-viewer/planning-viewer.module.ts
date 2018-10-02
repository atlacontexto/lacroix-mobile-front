import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningViewerPage } from './planning-viewer';

@NgModule({
  declarations: [
    PlanningViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanningViewerPage),
  ],
})
export class PlanningViewerPageModule {}
