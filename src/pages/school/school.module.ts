import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";
import { ProfessorsListComponent } from "./professors-list/professors-list";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ProfessorsListComponent],
  exports: [ProfessorsListComponent],
  imports: [IonicModule, TranslateModule.forChild()]
})
export class SchoolModule {}
