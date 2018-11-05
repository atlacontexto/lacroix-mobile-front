import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PlanningDailyPage } from "./planning-daily";
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
  declarations: [PlanningDailyPage],
  imports: [IonicPageModule.forChild(PlanningDailyPage), ComponentsModule]
})
export class PlanningDailyPageModule {}
