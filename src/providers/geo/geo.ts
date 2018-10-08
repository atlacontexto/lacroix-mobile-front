import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import geo from "../../fakedb/geo";
import { ENV } from "@environment";
import { AuthProvider } from "../auth/auth";
import { Platform } from "ionic-angular";

/*
  Generated class for the GeoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoProvider {
  apiUrl = ENV.API_LOCAL;
  geo: any;
  headers: { headers: { "x-access-token": string } };
  constructor(
    public http: HttpClient,
    private authProvider: AuthProvider,
    public platform: Platform
  ) {
    this.geo = geo;
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

  getSchoolsByCountyFake(countyId: any): any {
    return geo.schools.filter(s => {
      return s.county_id === countyId;
    });
  }

  getSchoolsByCounty(county_id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.apiUrl +
            "/profile/school-institutional?countyInstitutional=" +
            county_id,
          this.headers
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

  getStates(): any {
    return this.geo.states.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  }

  getCountiesByStateFake(stateId: any): any {
    return this.geo.counties.filter(e => {
      return e.state_id === stateId;
    });
  }

  getCountiesByState(stateId: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.apiUrl + "/profile/county-institutional?state_id=" + stateId,
          this.headers
        )
        .subscribe(
          res => {
            console.log(res);
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
