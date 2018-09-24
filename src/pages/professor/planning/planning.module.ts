import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PlanningPage } from "./planning";
import { PlanningProvider } from "../../../providers/planning/planning";

@NgModule({
  declarations: [PlanningPage],
  imports: [IonicPageModule.forChild(PlanningPage)],
  providers: [PlanningProvider]
})
export class PlanningPageModule {}
