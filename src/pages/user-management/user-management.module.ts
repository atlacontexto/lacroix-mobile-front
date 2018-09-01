import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UserManagementPage } from "./user-management";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { BasicInfoComponent } from "./basic-info/basic-info";
import { ProfilesComponent } from "./profiles/profiles";
import { PersonalComponent } from "./basic-info/personal/personal";
import { AccountComponent } from "./basic-info/account/account";
import { AddressComponent } from "./basic-info/address/address";

@NgModule({
  declarations: [
    UserManagementPage,
    BasicInfoComponent,
    ProfilesComponent,
    PersonalComponent,
    AccountComponent,
    AddressComponent
  ],
  imports: [
    IonicPageModule.forChild(UserManagementPage),
    TranslateModule.forChild(),
    ComponentsModule
  ]
})
export class UserManagementModule {}
