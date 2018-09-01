import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProfileEditPage } from "./profile-edit";
import { ProfileEditStudentComponent } from "./profile-edit-student/profile-edit-student";

@NgModule({
  declarations: [ProfileEditPage, ProfileEditStudentComponent],
  imports: [IonicPageModule.forChild(ProfileEditPage)]
})
export class ProfileEditPageModule {}
