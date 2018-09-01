import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProfileCreatePage } from "./profile-create";
import { TranslateModule } from "@ngx-translate/core";
import { ProfileCreateComunityComponent } from "./profile-create-comunity/profile-create-comunity";
import { ProfileCreateCountyComponent } from "./profile-create-county/profile-create-county";
import { ProfileCreateSchoolComponent } from "./profile-create-school/profile-create-school";
import { ProfileCreateProfessorComponent } from "./profile-create-professor/profile-create-professor";
import { ProfileCreateParentComponent } from "./profile-create-parent/profile-create-parent";
import { ProfileCreateStudentComponent } from "./profile-create-student/profile-create-student";

@NgModule({
  declarations: [
    ProfileCreatePage,
    ProfileCreateComunityComponent,
    ProfileCreateCountyComponent,
    ProfileCreateSchoolComponent,
    ProfileCreateProfessorComponent,
    ProfileCreateParentComponent,
    ProfileCreateStudentComponent
  ],
  imports: [
    IonicPageModule.forChild(ProfileCreatePage),
    TranslateModule.forChild()
  ]
})
export class ProfileCreatePageModule {}
