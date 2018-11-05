import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PlanningPage } from "./planning";
import { PlanningProvider } from "../../../providers/planning/planning";
import { PlanningListDailyComponent } from "./planning-list-daily/planning-list-daily";

@NgModule({
  declarations: [PlanningPage, PlanningListDailyComponent],
  exports: [PlanningListDailyComponent],
  imports: [IonicPageModule.forChild(PlanningPage)],
  providers: [PlanningProvider]
})
export class PlanningPageModule {}
