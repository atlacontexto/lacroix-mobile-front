import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PlanningListPage } from "./planning-list";
import { PlanningPageModule } from "../planning.module";

@NgModule({
  declarations: [PlanningListPage],
  imports: [IonicPageModule.forChild(PlanningListPage), PlanningPageModule]
})
export class PlanningListPageModule {}
