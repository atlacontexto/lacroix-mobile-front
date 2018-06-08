import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { BasicInfoComponent } from "./user-management/basic-info/basic-info";
import { ProfilesComponent } from "./user-management/profiles/profiles";
import { TranslateModule } from "@ngx-translate/core";
import { ProfileEditComponent } from "./user-management/profiles/profile-edit/profile-edit";
import { ProfileCreateComponent } from "./user-management/profiles/profile-create/profile-create";
@NgModule({
  declarations: [
    BasicInfoComponent,
    ProfilesComponent,
    ProfileEditComponent,
    ProfileCreateComponent
  ],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [
    BasicInfoComponent,
    ProfilesComponent,
    ProfileEditComponent,
    ProfileCreateComponent
  ]
})
export class ComponentsModule {}
