import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassroomDetailPage } from './classroom-detail';

@NgModule({
  declarations: [
    ClassroomDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassroomDetailPage),
  ],
})
export class ClassroomDetailPageModule {}
