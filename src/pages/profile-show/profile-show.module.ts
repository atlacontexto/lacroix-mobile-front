import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileShowPage } from './profile-show';

@NgModule({
  declarations: [
    ProfileShowPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileShowPage),
  ],
})
export class ProfileShowPageModule {}
