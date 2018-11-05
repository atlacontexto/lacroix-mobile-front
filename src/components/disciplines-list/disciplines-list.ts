import { Component } from '@angular/core';

/**
 * Generated class for the DisciplinesListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'disciplines-list',
  templateUrl: 'disciplines-list.html'
})
export class DisciplinesListComponent {

  text: string;

  constructor() {
    console.log('Hello DisciplinesListComponent Component');
    this.text = 'Hello World';
  }

}
