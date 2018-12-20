import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SchoolsPage } from "./schools";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SchoolsPage],
  imports: [IonicPageModule.forChild(SchoolsPage), TranslateModule.forChild()]
})
export class SchoolsPageModule {}
