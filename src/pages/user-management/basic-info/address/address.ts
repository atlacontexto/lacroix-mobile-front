import { Component } from '@angular/core';

/**
 * Generated class for the AddressComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'address',
  templateUrl: 'address.html'
})
export class AddressComponent {

  text: string;

  constructor() {
    console.log('Hello AddressComponent Component');
    this.text = 'Hello World';
  }

}
