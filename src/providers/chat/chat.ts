import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthProvider } from "../auth/auth";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

interface Message {
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
}

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  private apiUrl = ENV.API_LOCAL;
  headers: { headers: { "x-access-token": string } };

  constructor(
    public http: HttpClient,
    private authProvider: AuthProvider,
    platform: Platform
  ) {
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

  getProfessorsOfSameSchool(id: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.apiUrl}/profile/school-institutional/${id}/professors`,
          this.headers
        )
        .subscribe(
          response => {
            resolve(response["data"].map(data => data["requesting"]));
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getSchoolManagers(idSchool: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.apiUrl}/profile/school-institutional/${idSchool}`,
          this.headers
        )
        .subscribe(
          response => {
            resolve(response["data"]["school"]["school_managers"]);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  addMessage(message: Message) {}
}
