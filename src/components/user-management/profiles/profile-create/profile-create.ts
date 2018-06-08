import { Component } from '@angular/core';

/**
 * Generated class for the ProfileCreateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-create',
  templateUrl: 'profile-create.html'
})
export class ProfileCreateComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileCreateComponent Component');
    this.text = 'Hello World';
  }

}
