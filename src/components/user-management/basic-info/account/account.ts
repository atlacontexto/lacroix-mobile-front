import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

/**
 * Generated class for the AccountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "account",
  templateUrl: "account.html"
})
export class AccountComponent {
  formAccount: FormGroup;
  text: string;

  constructor() {
    console.log("Hello AccountComponent Component");
    this.text = "Hello World";
  }
}
