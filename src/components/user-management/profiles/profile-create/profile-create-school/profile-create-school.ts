import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import profiles from "../../../../../fakedb/profiles";
import geo from "../../../../../fakedb/geo";

/**
 * Generated class for the ProfileCreateSchoolComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-school",
  templateUrl: "profile-create-school.html"
})
export class ProfileCreateSchoolComponent {
  @Output() formSchoolSubmited = new EventEmitter();
  formSchool: FormGroup;
  roles: any;
  states: any;
  counties: any;
  schools: any;

  constructor(formBuilder: FormBuilder) {
    this.formSchool = formBuilder.group({
      role: ["", Validators.compose([Validators.required])],
      state: ["", Validators.compose([Validators.required])],
      county: ["", Validators.compose([Validators.required])],
      school: ["", Validators.compose([Validators.required])]
    });
  }

  ngAfterContentInit() {
    this.roles = profiles.schoolRoles;
    this.states = geo.states;
  }

  stateChanged(ev) {
    this.counties = geo.counties.filter(e => {
      return e.state_id === ev;
    });
  }

  countyChanged(ev) {
    this.schools = geo.schools.filter(s => {
      return s.county_id === ev;
    });
  }
}
