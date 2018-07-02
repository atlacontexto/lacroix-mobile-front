import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import profiles from "../../../../../fakedb/profiles";

/**
 * Generated class for the ProfileCreateParentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-parent",
  templateUrl: "profile-create-parent.html"
})
export class ProfileCreateParentComponent {
  @Output() formParentSubmited = new EventEmitter();
  formParent: FormGroup;
  kinships: any;

  constructor(formBuilder: FormBuilder) {
    this.formParent = formBuilder.group({
      kinship: ["", Validators.compose([Validators.required])]
    });
  }

  ngAfterContentInit() {
    this.kinships = profiles.kinships;
  }
}
