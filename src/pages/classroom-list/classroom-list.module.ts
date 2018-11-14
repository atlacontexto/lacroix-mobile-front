import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassroomListPage } from './classroom-list';

@NgModule({
  declarations: [
    ClassroomListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassroomListPage),
  ],
})
export class ClassroomListPageModule {}
