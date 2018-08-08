import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileInstitutionalShowPage } from './profile-institutional-show';

@NgModule({
  declarations: [
    ProfileInstitutionalShowPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileInstitutionalShowPage),
  ],
})
export class ProfileInstitutionalShowPageModule {}
