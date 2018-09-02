import { Component } from '@angular/core';

/**
 * Generated class for the ProfileEditComunityComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-edit-comunity',
  templateUrl: 'profile-edit-comunity.html'
})
export class ProfileEditComunityComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileEditComunityComponent Component');
    this.text = 'Hello World';
  }

}
