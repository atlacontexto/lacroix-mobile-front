import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AssestmentCheckPage } from "./assestment-check";
import { SchoolModule } from "../../../pages/school/school.module";
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [AssestmentCheckPage],
  imports: [
    IonicPageModule.forChild(AssestmentCheckPage),
    SchoolModule,
    ComponentsModule
  ]
})
export class AssestmentCheckPageModule {}
