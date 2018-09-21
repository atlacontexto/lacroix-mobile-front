import { Component } from '@angular/core';

/**
 * Generated class for the BillingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'billing',
  templateUrl: 'billing.html'
})
export class BillingComponent {

  text: string;

  constructor() {
    console.log('Hello BillingComponent Component');
    this.text = 'Hello World';
  }

}
