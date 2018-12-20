import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleManagementPage } from './role-management';

@NgModule({
  declarations: [
    RoleManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(RoleManagementPage),
  ],
})
export class RoleManagementPageModule {}
