import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPhonePage } from './register-phone';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegisterPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPhonePage),
    TranslateModule.forChild()
  ],
})
export class RegisterPhonePageModule {}
