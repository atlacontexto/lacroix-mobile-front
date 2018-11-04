import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";
import { ProfessorsListComponent } from "./professors-list/professors-list";

@NgModule({
  declarations: [ProfessorsListComponent],
  exports: [ProfessorsListComponent],
  imports: [IonicModule]
})
export class SchoolModule {}
