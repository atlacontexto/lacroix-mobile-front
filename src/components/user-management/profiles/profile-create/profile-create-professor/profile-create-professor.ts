import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";

/**
 * Generated class for the ProfileCreateProfessorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-professor",
  templateUrl: "profile-create-professor.html"
})
export class ProfileCreateProfessorComponent {
  formProfessor: FormGroup;
  @Output() formProfessorSubmited = new EventEmitter();
  levels: any;
  years: any;

  constructor(formBuilder: FormBuilder, private profiles: ProfilesProvider) {
    this.formProfessor = formBuilder.group({
      level: ["", Validators.compose([Validators.required])]
    });
  }

  ngAfterContentInit() {
    this.levels = this.profiles.getCourseLevels();
  }

  levelChanged(ev) {
    if (ev == "f1") {
      this.years = this.profiles.changeYearsRange(1, 5);
    } else if (ev == "f2") {
      this.years = this.profiles.changeYearsRange(6, 9);
    } else if (ev == "medio") {
      this.years = this.profiles.changeYearsRange(1, 3);
    } else if (ev == "superior") {
      this.years = this.profiles.changeYearsRange(1, 7);
    }
  }
}
