import { Component } from '@angular/core';

/**
 * Generated class for the ProfileEditParentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-edit-parent',
  templateUrl: 'profile-edit-parent.html'
})
export class ProfileEditParentComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileEditParentComponent Component');
    this.text = 'Hello World';
  }

}
