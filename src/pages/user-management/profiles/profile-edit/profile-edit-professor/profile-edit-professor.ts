import { Component } from '@angular/core';

/**
 * Generated class for the ProfileEditProfessorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-edit-professor',
  templateUrl: 'profile-edit-professor.html'
})
export class ProfileEditProfessorComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileEditProfessorComponent Component');
    this.text = 'Hello World';
  }

}
