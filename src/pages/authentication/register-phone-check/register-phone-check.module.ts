import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPhoneCheckPage } from './register-phone-check';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegisterPhoneCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPhoneCheckPage),
    TranslateModule.forChild()
  ],
})
export class RegisterPhoneCheckPageModule {}
