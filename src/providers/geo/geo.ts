import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import geo from "../../fakedb/geo";
import { ENV } from "@environment";

/*
  Generated class for the GeoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoProvider {
  apiUrl = ENV.API_LOCAL;
  geo: any;
  constructor(public http: HttpClient) {
    this.geo = geo;
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
            county_id
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
    return this.geo.states;
  }

  getCountiesByStateFake(stateId: any): any {
    return this.geo.counties.filter(e => {
      return e.state_id === stateId;
    });
  }

  getCountiesByState(stateId: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl + "/profile/county-institutional?state_id=" + stateId)
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
