import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  apiUrl = 'api';

  constructor(
    public http: HttpClient,
    public platform: Platform
  ) {
    if (platform.is('cordova')) {
      this.apiUrl = 'http://localhost:3000/api'
    }
  }

  update(user) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/user/basicinfo', user)
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.error(err);
          reject(err);
        });
    })
  }

}
