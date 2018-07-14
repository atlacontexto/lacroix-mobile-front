import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

/**
 * Generated class for the PersonalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "personal",
  templateUrl: "personal.html"
})
export class PersonalComponent {
  formPersonal: FormGroup;
  text: string;

  constructor(private formBuilder: FormBuilder) {
    this.formPersonal = this.formBuilder.group({
      name: [""],
      gender: [""],
      rg: [""],
      uf: [""],
      cpf: [""]
    });
  }
}
