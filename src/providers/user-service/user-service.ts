import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";
import { AuthServiceProvider } from "../auth-service/auth-service";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  apiUrl = ENV.API_LOCAL;

  constructor(
    public http: HttpClient,
    public platform: Platform,
    private authService: AuthServiceProvider
  ) {
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  getUserAtt(att) {
    const userInfo = this.authService.getDecodedAccessToken("token");
    if (att == "_id") {
      return userInfo["user"]["_id"];
    }
  }

  update(user) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/user/basicinfo", user, {
          headers: {
            "x-access-token":
              localStorage.getItem("token") ||
              localStorage.getItem("validationToken")
          }
        })
        .subscribe(
          res => {
            if (res["token"]) {
              localStorage.setItem("token", res["token"]);
              localStorage.removeItem("validationToken");
            }
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  getProfiles(): any {
    // if (!this.jwtHelper.isTokenExpired(localStorage.getItem("token"))) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/user/profiles`, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
    // }
  }

  createProfile(value) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + "/user/profiles", value, {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
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
