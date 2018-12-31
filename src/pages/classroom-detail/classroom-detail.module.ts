import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ClassroomDetailPage } from "./classroom-detail";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [ClassroomDetailPage],
  imports: [
    IonicPageModule.forChild(ClassroomDetailPage),
    TranslateModule.forChild(),
    ComponentsModule
  ]
})
export class ClassroomDetailPageModule {}
