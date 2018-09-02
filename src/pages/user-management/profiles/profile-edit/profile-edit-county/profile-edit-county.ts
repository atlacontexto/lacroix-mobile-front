import { Component } from '@angular/core';

/**
 * Generated class for the ProfileEditCountyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-edit-county',
  templateUrl: 'profile-edit-county.html'
})
export class ProfileEditCountyComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileEditCountyComponent Component');
    this.text = 'Hello World';
  }

}
