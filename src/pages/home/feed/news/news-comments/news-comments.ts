import { Component } from "@angular/core";

/**
 * Generated class for the NewsCommentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "news-comments",
  templateUrl: "news-comments.html"
})
export class NewsCommentsComponent {
  comments: { id: number; text: string }[];
  constructor() {
    this.comments = [
      {
        id: 1,
        text: "text"
      },
      {
        id: 1,
        text: "text"
      },
      {
        id: 1,
        text: "text"
      },
      {
        id: 1,
        text: "text"
      }
    ];
  }
}
