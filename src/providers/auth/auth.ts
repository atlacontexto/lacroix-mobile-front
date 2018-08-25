import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";
import * as JWT from "jwt-decode";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  apiUrl = ENV.API_LOCAL;
  headers: any;

  constructor(public http: HttpClient, public platform: Platform) {
    console.log("Hello AuthProvider Provider");
    if (platform.is("cordova")) {
      console.log(ENV.API_ENDPOINT);
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  getDecodedAccessToken(type: string): any {
    try {
      if (localStorage.getItem(type)) return JWT(localStorage.getItem(type));
    } catch (Error) {
      return null;
    }
  }

  isExpired(type: string): boolean {
    try {
      if (localStorage.getItem(type)) {
        let decoded = JWT(localStorage.getItem(type));
        var current_time = new Date().getTime() / 1000;
        return current_time > decoded["exp"];
      } else return null;
    } catch (error) {
      return null;
    }
  }

  sendSms(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "/notification/validation", data).subscribe(
        res => {
          localStorage.setItem(
            "validationToken",
            res["data"]["validationToken"]
          );
          // localStorage.setItem("refreshToken", res["data"]["refreshToken"]);
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  checkCode(code) {
    return new Promise((resolve, reject) => {
      if (!this.isExpired("validationToken")) {
        this.http
          .post(this.apiUrl + "/notification/codecheck", code, {
            headers: {
              "x-access-token":
                localStorage.getItem("token") ||
                localStorage.getItem("validationToken")
            }
          })
          .subscribe(
            res => {
              if (res["token"]) {
                localStorage.removeItem("validationToken");
                localStorage.setItem("token", res["token"]);
              }
              console.log(res);
              resolve(res);
            },
            err => {
              console.error(err);
              console.log("here");
              reject(err);
            }
          );
      } else {
        resolve("code expired");
      }
    });
  }
}
