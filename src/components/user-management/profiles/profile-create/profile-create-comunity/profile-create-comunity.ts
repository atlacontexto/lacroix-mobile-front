import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";

/**
 * Generated class for the ProfileCreateComunityComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-comunity",
  templateUrl: "profile-create-comunity.html"
})
export class ProfileCreateComunityComponent {
  formComunity: FormGroup;
  @Output() formComunitySubmited = new EventEmitter();
  voluntaries: any;

  constructor(
    formBuilder: FormBuilder,
    private profilesService: ProfilesProvider
  ) {
    this.formComunity = formBuilder.group({
      personality: ["", Validators.compose([Validators.required])],
      name: [""],
      post: [""],
      type: [""],
      voluntary: [""]
    });
  }

  ngAfterContentInit() {
    this.voluntaries = this.profilesService.getVoluntaries();
  }
}
