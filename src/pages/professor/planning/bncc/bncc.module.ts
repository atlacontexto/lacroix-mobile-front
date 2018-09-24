import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BnccPage } from './bncc';

@NgModule({
  declarations: [
    BnccPage,
  ],
  imports: [
    IonicPageModule.forChild(BnccPage),
  ],
})
export class BnccPageModule {}
