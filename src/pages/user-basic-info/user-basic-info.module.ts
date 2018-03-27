import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBasicInfoPage } from './user-basic-info';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserBasicInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBasicInfoPage),
    TranslateModule.forChild()
  ],
})
export class UserBasicInfoPageModule {}
