import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProfileEditPage } from "./profile-edit";
import { ProfileEditStudentComponent } from "./profile-edit-student/profile-edit-student";
import { ProfileEditParentComponent } from "./profile-edit-parent/profile-edit-parent";
import { ProfileEditProfessorComponent } from "./profile-edit-professor/profile-edit-professor";
import { ProfileEditSchoolComponent } from "./profile-edit-school/profile-edit-school";
import { ProfileEditCountyComponent } from "./profile-edit-county/profile-edit-county";
import { ProfileEditComunityComponent } from "./profile-edit-comunity/profile-edit-comunity";

@NgModule({
  declarations: [
    ProfileEditPage,
    ProfileEditStudentComponent,
    ProfileEditParentComponent,
    ProfileEditProfessorComponent,
    ProfileEditSchoolComponent,
    ProfileEditCountyComponent,
    ProfileEditComunityComponent
  ],
  imports: [IonicPageModule.forChild(ProfileEditPage)]
})
export class ProfileEditPageModule {}
