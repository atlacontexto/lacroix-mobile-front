import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import profiles from "../../../../../fakedb/profiles";

/**
 * Generated class for the ProfileCreateStudentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-student",
  templateUrl: "profile-create-student.html"
})
export class ProfileCreateStudentComponent {
  formStudent: FormGroup;
  levelSelected: any;
  @Output() formStudentSubmited = new EventEmitter();
  levels: { value: string; viewValue: string }[];
  years: any;

  constructor(formBuilder: FormBuilder) {
    this.formStudent = formBuilder.group({
      level: ["", Validators.compose([Validators.required])],
      year: ["", Validators.compose([Validators.required])]
    });
  }

  ngAfterContentInit() {
    this.levels = profiles.courseLevels;
  }

  changeYearsRange(v1, v2) {
    this.years = profiles.courseYears.filter(v => {
      return Number(v.value) >= v1 && Number(v.value) <= v2;
    });
  }

  levelChanged(ev) {
    console.log(ev);
    if (ev == "f1") {
      this.changeYearsRange(4, 5);
    } else if (ev == "f2") {
      this.changeYearsRange(6, 9);
    } else if (ev == "medio") {
      this.changeYearsRange(1, 3);
    } else if (ev == "superior") {
      this.changeYearsRange(1, 7);
    }
  }
}
