import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ClassroomPage } from "./classroom";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [ClassroomPage],
  imports: [
    IonicPageModule.forChild(ClassroomPage),
    TranslateModule.forChild(),
    ComponentsModule
  ]
})
export class ClassroomPageModule {}
