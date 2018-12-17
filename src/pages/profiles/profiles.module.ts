import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProfilesPage } from "./profiles";
import { UserManagementModule } from "../user-management/user-management.module";

@NgModule({
  declarations: [ProfilesPage],
  imports: [IonicPageModule.forChild(ProfilesPage), UserManagementModule]
})
export class ProfilesPageModule {}
