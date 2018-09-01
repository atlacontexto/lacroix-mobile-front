import { Component, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { ViewController, NavController } from "ionic-angular";

/**
 * Generated class for the ProfileEditStudentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-edit-student",
  templateUrl: "profile-edit-student.html"
})
export class ProfileEditStudentComponent {
  formStudentUpdate: FormGroup;
  @Input() profileStudentInfo;
  text: string;
  levels: any;
  series: any;
  school: any;

  constructor(
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private viewCtrl: ViewController,
    private navCtrl: NavController
  ) {
    this.levels = profilesProvider.getCourseLevels();
  }

  ngAfterContentInit() {
    this.profilesProvider
      .getSchoolBasicInfo(this.profileStudentInfo.school)
      .then(res => {
        if (res["success"]) {
          this.school = {
            image: this.profileStudentInfo.icon,
            ...res["data"]["school"]
          };
          console.log(this.school);
        }
      })
      .catch(err => {
        console.error(err);
      });

    this.series = this.profilesProvider.getYearRangeByLevel(
      this.profileStudentInfo.level
    );
    this.formStudentUpdate = this.formBuilder.group({
      level: [this.profileStudentInfo.level],
      serie: [this.profileStudentInfo.serie]
    });
  }

  openPage(params) {
    this.navCtrl.push("ProfileShowPage", params, {
      animate: true,
      direction: "forward"
    });
  }
}
