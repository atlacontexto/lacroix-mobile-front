import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProfilesProvider } from "../profiles/profiles";
import { BehaviorSubject, Subject } from "rxjs";
import { ENV } from "@environment";
import { Platform } from "ionic-angular";
import { Profile } from "../../app/model/profile";
import { filter, takeUntil } from "rxjs/operators";

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
  _unsubscribeAll: any;
  _currentPost: BehaviorSubject<any>;
  constructor(
    public http: HttpClient,
    public profilesProvider: ProfilesProvider,
    public platform: Platform
  ) {
    console.log("Hello FeedProvider Provider");
    this._currentPost = new BehaviorSubject(null);
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
    this._unsubscribeAll = new Subject();
    this.profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this.currentProfile = profile;
        this.getPostsByProfile(this.currentProfile.id)
          .then(res => {
            this.news.next(res);
          })
          .catch(err => {
            console.error(err);
          });
      });

    this.headers = {
      headers: { "x-access-token": localStorage.getItem("token") }
    };
  }

  getPostsByProfile(id): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/social/news/${id}/feed`, this.headers)
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
