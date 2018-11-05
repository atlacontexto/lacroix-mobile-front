import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PlanningCheckPage } from "./planning-check";
import { SchoolModule } from "../../../pages/school/school.module";

@NgModule({
  declarations: [PlanningCheckPage],
  imports: [IonicPageModule.forChild(PlanningCheckPage), SchoolModule]
})
export class PlanningCheckPageModule {}
