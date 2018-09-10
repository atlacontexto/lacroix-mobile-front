import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";
import * as JWT from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { AlertProvider } from "../alert-service/alert-service";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  apiUrl = ENV.API_LOCAL;
  headers: any;
  isLogged;
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cellphone: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    public http: HttpClient,
    public platform: Platform,
    public alertService: AlertProvider
  ) {
    this.isLoggedIn.subscribe(value => {
      if (value) {
        this.headers = {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        };
      }
    });
    this.isLoggedIn.next(this.isTokenValid("token"));
    console.log("Hello AuthProvider Provider");
    if (platform.is("cordova")) {
      console.log(ENV.API_ENDPOINT);
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  updateToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/updateToken`, {}, this.headers).subscribe(
        res => {
          if (res["success"]) {
            localStorage.setItem("token", res["token"]);
            this.isLoggedIn.next(this.isTokenValid("token"));
          }
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getDecodedAccessToken(type: string): any {
    try {
      if (localStorage.getItem(type)) return JWT(localStorage.getItem(type));
    } catch (Error) {
      return null;
    }
  }

  isTokenValid(type: string): boolean {
    try {
      if (localStorage.getItem(type)) {
        let decoded = JWT(localStorage.getItem(type));
        var current_time = new Date().getTime() / 1000;
        return current_time < decoded["exp"];
      } else return null;
    } catch (error) {
      return null;
    }
  }

  signin(credentials: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiUrl}/signin`, credentials, this.headers)
        .subscribe(
          res => {
            if (res["success"]) {
              localStorage.setItem("token", res["token"]);
              this.isLoggedIn.next(this.isTokenValid("token"));
            }
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
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
          if (res["success"]) {
            resolve(res["data"]);
          } else {
            this.alertService.presentAlert(
              "Erro ao enviar SMS",
              "Tente novamente mais tarde",
              "OK"
            );
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  checkCode(code) {
    return new Promise((resolve, reject) => {
      if (this.isTokenValid("validationToken")) {
        this.http
          .post(this.apiUrl + "/notification/codecheck", code, {
            headers: {
              "x-access-token":
                // localStorage.getItem("token") ||
                localStorage.getItem("validationToken")
            }
          })
          .subscribe(
            res => {
              if (res["token"]) {
                localStorage.removeItem("validationToken");
                localStorage.setItem("token", res["token"]);
                this.isLoggedIn.next(this.isTokenValid("token"));
              }

              resolve(res);
            },
            err => {
              reject(err);
            }
          );
      } else {
        resolve("code expired");
      }
    });
  }
}
