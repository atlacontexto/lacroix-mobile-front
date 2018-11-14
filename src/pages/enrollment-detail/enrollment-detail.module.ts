import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnrollmentDetailPage } from './enrollment-detail';

@NgModule({
  declarations: [
    EnrollmentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EnrollmentDetailPage),
  ],
})
export class EnrollmentDetailPageModule {}
