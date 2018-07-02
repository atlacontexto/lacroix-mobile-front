import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import profiles from "../../../../../fakedb/profiles";

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

  constructor(formBuilder: FormBuilder) {
    this.formProfessor = formBuilder.group({
      level: ["", Validators.compose([Validators.required])]
    });
  }

  ngAfterContentInit() {
    this.levels = profiles.courseLevels;
  }
}
