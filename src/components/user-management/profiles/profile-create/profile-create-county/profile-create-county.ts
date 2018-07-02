import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import geo from "../../../../../fakedb/geo";

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
  counties: { id: number; state_id: number; name: string }[];

  constructor(formBuilder: FormBuilder) {
    this.formCounty = formBuilder.group({
      state: ["", Validators.compose([Validators.required])],
      county: ["", Validators.compose([Validators.required])],
      division: ["", Validators.compose([Validators.required])]
    });
  }

  ngAfterContentInit() {
    this.states = geo.states;
  }

  stateChanged(ev) {
    console.log(ev);
    this.counties = geo.counties.filter(e => {
      return e.state_id === ev;
    });
  }
}
