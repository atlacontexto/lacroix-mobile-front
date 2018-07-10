import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GeoProvider } from "../../../../../providers/geo/geo";

/**
 * Generated class for the ProfileCreateCountyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-county",
  templateUrl: "profile-create-county.html"
})
export class ProfileCreateCountyComponent {
  formCounty: FormGroup;
  @Output() formCountySubmited = new EventEmitter();
  states: { id: number; name: string; abbr: string }[];
  counties: any;

  constructor(formBuilder: FormBuilder, private geoProvider: GeoProvider) {
    this.formCounty = formBuilder.group({
      state: ["", Validators.compose([Validators.required])],
      county: ["", Validators.compose([Validators.required])],
      division: ["", Validators.compose([Validators.required])]
    });
  }

  ngAfterContentInit() {
    this.states = this.geoProvider.getStates();
  }

  stateChanged(stateId) {
    this.geoProvider
      .getCountiesByState(stateId)
      .then(counties => {
        console.log(counties["data"]);
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
      })
      .catch(err => {
        console.log(err);
      });
  }
}
