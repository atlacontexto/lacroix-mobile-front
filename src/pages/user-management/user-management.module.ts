import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UserManagementPage } from "./user-management";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";
import { BasicInfoComponent } from "./basic-info/basic-info";
import { ProfilesComponent } from "./profiles/profiles";

import { AccountComponent } from "./basic-info/account/account";

import { BillingComponent } from "./basic-info/billing/billing";
import { AddressPageModule } from "./address/address.module";
import { PersonalPageModule } from "./personal/personal.module";

@NgModule({
  declarations: [
    UserManagementPage,
    BasicInfoComponent,
    ProfilesComponent,
    AccountComponent,
    BillingComponent
  ],
  imports: [
    IonicPageModule.forChild(UserManagementPage),
    TranslateModule.forChild(),
    ComponentsModule,
    AddressPageModule,
    PersonalPageModule
  ],
  exports: [ProfilesComponent]
})
export class UserManagementModule {}
