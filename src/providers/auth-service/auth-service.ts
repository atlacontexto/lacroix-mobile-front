import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  apiUrl = ENV.API_LOCAL;

  constructor(public http: HttpClient, public platform: Platform) {
    if (platform.is("cordova")) {
      console.log(ENV.API_ENDPOINT);
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "/user", JSON.stringify(data)).subscribe(
        res => {
          console.log(res);
          resolve(res);
        },
        err => {
          console.error(err);
          reject(err);
        }
      );
    });
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + "/user").subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  sendSms(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "/notification/validation", data).subscribe(
        res => {
          localStorage.setItem("token", res["data"]["token"]);
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  checkCode(code) {
    if (localStorage.getItem("token")) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem("token")
        })
      };
      return new Promise((resolve, reject) => {
        this.http
          .post(this.apiUrl + "/notification/codecheck", code, httpOptions)
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
  }
}
