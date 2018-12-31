import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SchoolsPage } from "./schools";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [SchoolsPage],
  imports: [
    IonicPageModule.forChild(SchoolsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ]
})
export class SchoolsPageModule {}
