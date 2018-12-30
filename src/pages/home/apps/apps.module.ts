import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AppsPage } from "./apps";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [AppsPage],
  imports: [IonicPageModule.forChild(AppsPage), TranslateModule.forChild()]
})
export class AppsPageModule {}
