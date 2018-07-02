import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProfileCreatePage } from "./profile-create";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [ProfileCreatePage],
  imports: [
    IonicPageModule.forChild(ProfileCreatePage),
    TranslateModule.forChild(),
    ComponentsModule
  ]
})
export class ProfileCreatePageModule {}
