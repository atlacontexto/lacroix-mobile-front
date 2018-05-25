import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBasicInfoPage } from './user-basic-info';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserBasicInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBasicInfoPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class UserBasicInfoPageModule {}
