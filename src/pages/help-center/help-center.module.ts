import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HelpCenterPage } from "./help-center";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [HelpCenterPage],
  imports: [IonicPageModule.forChild(HelpCenterPage), ComponentsModule]
})
export class HelpCenterPageModule {}
