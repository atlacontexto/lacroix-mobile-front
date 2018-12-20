import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolYearPage } from './school-year';

@NgModule({
  declarations: [
    SchoolYearPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolYearPage),
  ],
})
export class SchoolYearPageModule {}
