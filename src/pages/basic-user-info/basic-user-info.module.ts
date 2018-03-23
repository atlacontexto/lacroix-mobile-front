import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasicUserInfoPage } from './basic-user-info';

@NgModule({
  declarations: [
    BasicUserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BasicUserInfoPage),
  ],
})
export class BasicUserInfoPageModule {}
