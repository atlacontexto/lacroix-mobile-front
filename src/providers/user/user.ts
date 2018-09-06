import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";
import { AuthProvider } from "../auth/auth";
import { BehaviorSubject } from "rxjs";
import { User } from "../../app/model/user";
import { ProfilesProvider } from "../profiles/profiles";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  apiUrl = ENV.API_LOCAL;
  user: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);

  constructor(
    public http: HttpClient,
    public platform: Platform,
    private authService: AuthProvider,
    private profiles: ProfilesProvider
  ) {
    console.log("Hello UserProvider Provider");
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
  }

  async buildUser() {
    return await this.getAllUserInfo()
      .then(userInfo => {
        const user = new User(this.profiles);
        user.setProfiles(userInfo["profiles"]);
        user.setPeople(userInfo["people"]);
        user.setMainProfile(userInfo["mainProfile"]);
        user.setId(userInfo["_id"]);
        user.setShortName(userInfo["shortName"]);
        this.profiles.currentProfile.next(user.getMainProfile());
        this.user.next(user);
      })
      .catch(err => {
        console.log(err);
      });
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

  getAllUserInfo() {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/user/user-info`, {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .subscribe(
          res => {
            if (res["success"]) {
              resolve(res["data"]["user"]);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
