import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RoleManagementPage } from "./role-management";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [RoleManagementPage],
  imports: [IonicPageModule.forChild(RoleManagementPage), ComponentsModule]
})
export class RoleManagementPageModule {}
