import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import profiles from "../../../../../fakedb/profiles";
import geo from "../../../../../fakedb/geo";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { GeoProvider } from "../../../../../providers/geo/geo";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";

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
  @Output()
  formSchoolSubmited = new EventEmitter();
  formSchool: FormGroup;
  roles: any;
  states: any;
  counties: any;
  schools: any;

  constructor(
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private geoProvider: GeoProvider,
    private alertProvider: AlertProvider
  ) {
    this.formSchool = this.formBuilder.group({
      role: ["", Validators.compose([Validators.required])],
      hasSchool: [false, Validators.required],
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
    this.alertProvider.presentControlledLoader(
      "Atualizando lista de cidades..."
    );
    this.geoProvider
      .getCountiesByState(stateId)
      .then(counties => {
        this.counties = counties["data"]["profiles"];
        this.counties.sort((a, b) => {
          if (a.external_id > b.external_id) {
            return 1;
          }
          if (a.external_id < b.external_id) {
            return -1;
          }
          return 0;
        });
        this.alertProvider.loading.dismiss();
      })
      .catch(err => {
        this.alertProvider.loading.dismiss();
      });
  }

  countyChanged(countyId) {
    this.schools = this.geoProvider.getSchoolsByCounty(countyId);
  }
}
