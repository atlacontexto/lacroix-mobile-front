import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV } from "@environment";
import { Platform } from "ionic-angular";

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  apiUrl = ENV.API_LOCAL;
  constructor(public http: HttpClient, public platform: Platform) {
    console.log("Hello NotificationProvider Provider");
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }
}
