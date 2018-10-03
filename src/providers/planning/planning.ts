import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthProvider } from "../auth/auth";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";
import { ProfilesProvider } from "../profiles/profiles";

/*
  Generated class for the PlanningProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlanningProvider {
  apiUrl = ENV.API_LOCAL;
  headers: { headers: { "x-access-token": string } };
  constructor(
    public http: HttpClient,
    public authProvider: AuthProvider,
    public platform: Platform,
    public _profilesProvider: ProfilesProvider
  ) {
    console.log("Hello PlanningProvider Provider");
    if (platform.is("cordova")) {
      console.log(ENV.API_ENDPOINT);
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

  getHabilities(year: any, subject: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${
            this.apiUrl
          }/competence/hability?ano=${year}&componente=${subject}`,
          this.headers
        )
        .subscribe(
          res => {
            console.log(res);
            resolve(res["data"]);
          },
          err => {
            console.error(err);
            reject(err);
          }
        );
    });
  }

  getDailyPlanningByTheme(theme) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.apiUrl}/profile/professor/${
            this._profilesProvider.currentProfile.value.id
          }/planning/daily?theme=${theme}`,
          this.headers
        )
        .subscribe(
          res => {
            resolve(res["data"]["planning"]);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
}
