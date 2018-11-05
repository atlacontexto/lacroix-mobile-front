import { Component } from '@angular/core';

/**
 * Generated class for the DocumentCommentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'document-comments',
  templateUrl: 'document-comments.html'
})
export class DocumentCommentsComponent {

  text: string;

  constructor() {
    console.log('Hello DocumentCommentsComponent Component');
    this.text = 'Hello World';
  }

}
