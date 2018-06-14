import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";
import * as jwt_decode from "jwt-decode";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  apiUrl = ENV.API_LOCAL;
  headers: any;

  constructor(public http: HttpClient, public platform: Platform) {
    if (platform.is("cordova")) {
      console.log(ENV.API_ENDPOINT);
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  getDecodedAccessToken(type: string): any {
    try {
      if (localStorage.getItem(type))
        return jwt_decode(localStorage.getItem(type));
    } catch (Error) {
      return null;
    }
  }

  isExpired(type: string): boolean {
    try {
      if (localStorage.getItem(type)) {
        let decoded = localStorage.getItem(type);
        console.log(decoded);
        return false;
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
    if (!this.isExpired(localStorage.getItem("validationToken"))) {
      return new Promise((resolve, reject) => {
        this.http
          .post(this.apiUrl + "/notification/codecheck", code, {
            headers: {
              "x-access-token": localStorage.getItem("validationToken")
            }
          })
          .subscribe(
            res => {
              console.log(res);
              if (res["token"]) {
                localStorage.removeItem("validationToken");
                localStorage.setItem("token", res["token"]);
              }
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
