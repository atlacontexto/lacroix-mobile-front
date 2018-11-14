import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV } from "@environment";
import { Platform } from "ionic-angular";
import { AuthProvider } from "../auth/auth";

/*
  Generated class for the ClassroomsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClassroomsProvider {
  apiUrl = ENV.API_LOCAL;

  headers: any;
  constructor(
    public http: HttpClient,
    public authProvider: AuthProvider,
    public platform: Platform
  ) {
    console.log("Hello ClassroomsProvider Provider");
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }

    this.authProvider.isLoggedIn.subscribe(value => {
      if (value) {
        this.headers = {
          headers: { "x-access-token": localStorage.getItem("token") }
        };
      }
    });
  }

  getClassRoomsBySchoolId(_id: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/classroom?school=${_id}`, this.headers)
        .subscribe(
          res => {
            let classrooms = res["data"];
            classrooms.sort((a, b) => {
              if (a.series > b.series) {
                return 1;
              }
              if (a.series < b.series) {
                return -1;
              }
              return 0;
            });
            resolve(classrooms);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  activateProfessor(id: any, _idClassroom: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.apiUrl}/classroom/${_idClassroom}/linkin-professor`,
          { professor: id },
          this.headers
        )
        .subscribe(
          res => {
            resolve(res["data"]);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
