import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ENV } from "@environment";
import { Platform } from "ionic-angular";
import { AuthProvider } from "../auth/auth";

/*
  Generated class for the PersonalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PersonalProvider {
  private apiUrl = ENV.API_LOCAL;
  headers: { headers: { "x-access-token": string } };
  constructor(
    public _http: HttpClient,
    platform: Platform,
    private authProvider: AuthProvider
  ) {
    console.log("Hello PersonalProvider Provider");
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

  getPeople(): any {
    return new Promise((resolve, reject) => {
      this._http
        .get(`${this.apiUrl}/people/people-info`, this.headers)
        .subscribe(
          response => {
            resolve(response["data"]["people"]);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  createPeople(people): any {
    return new Promise((resolve, reject) => {
      this._http
        .post(`${this.apiUrl}/people/people-info`, people, this.headers)
        .subscribe(
          response => {
            localStorage.setItem("token", response["data"]["token"]);
            resolve(response["data"]["people"]);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  updatePeople(people): any {
    return new Promise((resolve, reject) => {
      this._http.put(`${this.apiUrl}/people/people-info`, people, this.headers).subscribe(
        response => {
          localStorage.setItem("token", response["data"]["token"]);
          resolve(response["data"]["people"]);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
