import { Component } from "@angular/core";

/**
 * Generated class for the RequestsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "requests",
  templateUrl: "requests.html"
})
export class RequestsComponent {
  requests: { ex: number }[];
  constructor() {
    this.requests = [
      {
        ex: 1
      },
      {
        ex: 1
      },
      {
        ex: 1
      },
      {
        ex: 1
      }
    ];
  }
}
