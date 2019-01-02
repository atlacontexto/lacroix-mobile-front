import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PersonalPage } from "./personal";
import { PersonalComponent } from "./personal/personal";

@NgModule({
  declarations: [PersonalPage, PersonalComponent],
  imports: [IonicPageModule.forChild(PersonalPage)],
  exports: [PersonalComponent]
})
export class PersonalPageModule {}
