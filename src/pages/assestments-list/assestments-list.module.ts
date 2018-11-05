import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssestmentsListPage } from './assestments-list';

@NgModule({
  declarations: [
    AssestmentsListPage,
  ],
  imports: [
    IonicPageModule.forChild(AssestmentsListPage),
  ],
})
export class AssestmentsListPageModule {}
