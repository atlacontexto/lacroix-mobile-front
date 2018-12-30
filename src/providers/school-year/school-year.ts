import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV } from "@environment";
import { Platform } from "ionic-angular";
import { AuthProvider } from "../auth/auth";
import { BehaviorSubject } from "rxjs";
import profiles from "../../fakedb/profiles";

/*
  Generated class for the SchoolYearProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SchoolYearProvider {
  apiUrl = ENV.API_LOCAL;
  headers: any;
  haveSchoolYearsUpdated: BehaviorSubject<Boolean>;
  constructor(
    public http: HttpClient,
    public authProvider: AuthProvider,
    public platform: Platform
  ) {
    console.log("Hello SchoolYearProvider Provider");
    this.haveSchoolYearsUpdated = new BehaviorSubject(false);
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

  savePeriod(form: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/period`, form, this.headers).subscribe(
        res => {
          this.haveSchoolYearsUpdated.next(res["success"]);
          resolve(res["data"]);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateSchoolYear(id: any, value: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.apiUrl}/school-year/${id}`, value, this.headers)
        .subscribe(
          res => {
            this.haveSchoolYearsUpdated.next(res["success"]);
            resolve(res["data"]);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  createSchoolYear(value: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiUrl}/school-year`, value, this.headers)
        .subscribe(
          res => {
            this.haveSchoolYearsUpdated.next(res["success"]);
            resolve(res["data"]);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getSchoolYearByCounty(_id: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/school-year?county=${_id}`, this.headers)
        .subscribe(
          res => {
            if (res["data"]["regime"]) {
              res["data"]["regime"] = profiles.periods.find(
                el => el.value == res["data"]["regime"]
              );
            }
            resolve(res["data"]);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  getSchoolYearDetail(schoolYearId: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/school-year/${schoolYearId}`, this.headers)
        .subscribe(
          res => {
            console.log(res);
            if (res["data"]["regime"]) {
              res["data"]["regime"] = profiles.periods.find(
                el => el.value == res["data"]["regime"]
              );
            }
            resolve(res["data"]);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
}
