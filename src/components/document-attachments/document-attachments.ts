import { Component } from '@angular/core';

/**
 * Generated class for the DocumentAttachmentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'document-attachments',
  templateUrl: 'document-attachments.html'
})
export class DocumentAttachmentsComponent {

  text: string;

  constructor() {
    console.log('Hello DocumentAttachmentsComponent Component');
    this.text = 'Hello World';
  }

}
