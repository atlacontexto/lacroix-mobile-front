import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProfilesProvider } from "../profiles/profiles";
import { BehaviorSubject } from "rxjs";
import { ENV } from "@environment";
import { Platform } from "ionic-angular";
import { Profile } from "../../app/model/profile";

/*
  Generated class for the FeedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedProvider {
  apiUrl = ENV.API_LOCAL;
  news: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  headers: { headers: { "x-access-token": string } };
  currentProfile: Profile;
  constructor(
    public http: HttpClient,
    public profilesProvider: ProfilesProvider,
    public platform: Platform
  ) {
    console.log("Hello FeedProvider Provider");
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
    this.profilesProvider.currentProfile.subscribe(profile => {
      if (profile instanceof Profile) {
        this.currentProfile = profile;
        this.getPostsByProfile()
          .then(res => {
            this.news.next(res);
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
    this.headers = {
      headers: { "x-access-token": localStorage.getItem("token") }
    };
  }

  getPostsByProfile(): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.apiUrl}/social/news/${this.currentProfile.id}/feed`,
          this.headers
        )
        .subscribe(
          res => {
            resolve(res["data"]);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  postNews(post): any {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.apiUrl}/social/news/${this.currentProfile.id}`,
          { content: post },
          this.headers
        )
        .subscribe(
          res => {
            console.log(res);
            resolve(res["newNews"]);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
