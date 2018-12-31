import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ClassroomListPage } from "./classroom-list";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [ClassroomListPage],
  imports: [IonicPageModule.forChild(ClassroomListPage), ComponentsModule]
})
export class ClassroomListPageModule {}
