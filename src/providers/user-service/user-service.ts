import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  apiUrl = ENV.API_LOCAL;

  constructor(public http: HttpClient, public platform: Platform) {
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  update(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token")
      })
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/user/basicinfo", user, httpOptions)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  getProfiles(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token")
      })
    };
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.apiUrl}/user/${localStorage.getItem("userId")}/profile`,
          httpOptions
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  createProfile(value) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token")
      })
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(
          this.apiUrl + "/user/" + localStorage.getItem("userId") + "/profile",
          value,
          httpOptions
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  updateProfile(profile) {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + "/profile/" + profile._id, profile).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
