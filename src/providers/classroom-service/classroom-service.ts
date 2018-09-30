import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV } from "@environment";
import { Platform } from "ionic-angular";

/*
  Generated class for the ClassroomServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClassroomServiceProvider {
  apiUrl = ENV.API_LOCAL;

  constructor(public http: HttpClient, public platform: Platform) {
    console.log("Hello ClassroomProvider Provider");
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  getEnrollments(professorId) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl + "/classroom/students?professor=" + professorId)
        .subscribe(
          data => {
            console.log(data["message"]);
            if (data["success"]) {
              resolve(data["data"]);
            }
          },
          err => {
            reject(reject);
          }
        );
    });
  }
}
