import { Component } from '@angular/core';

/**
 * Generated class for the ProfileEditSchoolComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-edit-school',
  templateUrl: 'profile-edit-school.html'
})
export class ProfileEditSchoolComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileEditSchoolComponent Component');
    this.text = 'Hello World';
  }

}
