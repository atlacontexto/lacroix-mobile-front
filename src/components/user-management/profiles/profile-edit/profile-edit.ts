import { Component } from '@angular/core';

/**
 * Generated class for the ProfileEditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileEditComponent Component');
    this.text = 'Hello World';
  }

}
