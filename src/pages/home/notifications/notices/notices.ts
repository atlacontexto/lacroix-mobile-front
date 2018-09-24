import { Component } from '@angular/core';

/**
 * Generated class for the NoticesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notices',
  templateUrl: 'notices.html'
})
export class NoticesComponent {

  text: string;

  constructor() {
    console.log('Hello NoticesComponent Component');
    this.text = 'Hello World';
  }

}
