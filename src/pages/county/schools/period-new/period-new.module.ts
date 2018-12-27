import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeriodNewPage } from './period-new';

@NgModule({
  declarations: [
    PeriodNewPage,
  ],
  imports: [
    IonicPageModule.forChild(PeriodNewPage),
  ],
})
export class PeriodNewPageModule {}
