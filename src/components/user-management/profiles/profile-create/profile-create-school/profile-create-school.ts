import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import profiles from "../../../../../fakedb/profiles";
import geo from "../../../../../fakedb/geo";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { GeoProvider } from "../../../../../providers/geo/geo";

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

  constructor(
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private geoProvider: GeoProvider
  ) {
    this.formSchool = this.formBuilder.group({
      role: ["", Validators.compose([Validators.required])],
      state: ["", Validators.compose([Validators.required])],
      county: ["", Validators.compose([Validators.required])],
      school: ["", Validators.compose([Validators.required])]
    });
  }

  ngAfterContentInit() {
    this.roles = this.profilesProvider.getSchoolRoles();
    this.states = this.geoProvider.getStates();
  }

  stateChanged(stateId) {
    this.counties = this.geoProvider.getCountiesByState(stateId);
  }

  countyChanged(countyId) {
    this.schools = this.geoProvider.getSchoolsByCounty(countyId);
  }
}
