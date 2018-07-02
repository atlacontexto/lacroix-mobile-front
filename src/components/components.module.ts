import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { BasicInfoComponent } from "./user-management/basic-info/basic-info";
import { ProfilesComponent } from "./user-management/profiles/profiles";
import { TranslateModule } from "@ngx-translate/core";
import { ProfileEditComponent } from "./user-management/profiles/profile-edit/profile-edit";
import { ExpandableComponent } from "./expandable/expandable";
import { ProfileCreateStudentComponent } from "./user-management/profiles/profile-create/profile-create-student/profile-create-student";
import { ProfileCreateParentComponent } from "./user-management/profiles/profile-create/profile-create-parent/profile-create-parent";
import { ProfileCreateProfessorComponent } from "./user-management/profiles/profile-create/profile-create-professor/profile-create-professor";
import { ProfileCreateSchoolComponent } from "./user-management/profiles/profile-create/profile-create-school/profile-create-school";
import { ProfileCreateCountyComponent } from "./user-management/profiles/profile-create/profile-create-county/profile-create-county";
import { ProfileCreateComunityComponent } from "./user-management/profiles/profile-create/profile-create-comunity/profile-create-comunity";

@NgModule({
  declarations: [
    BasicInfoComponent,
    ProfilesComponent,
    ProfileEditComponent,
    ExpandableComponent,
    ProfileCreateStudentComponent,
    ProfileCreateParentComponent,
    ProfileCreateProfessorComponent,
    ProfileCreateSchoolComponent,
    ProfileCreateCountyComponent,
    ProfileCreateComunityComponent,
    ProfileCreateStudentComponent
  ],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [
    BasicInfoComponent,
    ProfilesComponent,
    ProfileEditComponent,
    ExpandableComponent,
    ProfileCreateStudentComponent,
    ProfileCreateParentComponent,
    ProfileCreateProfessorComponent,
    ProfileCreateSchoolComponent,
    ProfileCreateCountyComponent,
    ProfileCreateComunityComponent,
    ProfileCreateStudentComponent
  ]
})
export class ComponentsModule {}
