import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import profiles from "../../fakedb/profiles";
import { ENV } from "@environment";

/*
  Generated class for the ProfilesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfilesProvider {
  apiUrl = ENV.API_LOCAL;
  profiles: any;
  headers: any;
  constructor(public http: HttpClient) {
    this.profiles = profiles;
    this.headers = {
      headers: { "x-access-token": localStorage.getItem("token") }
    };
  }

  getLevelViewName(name) {
    let level = profiles.courseLevels.filter(v => {
      return v.value === name;
    });
    return level[0]["viewValue"];
  }

  getCourseLevelsExcept(level): any {
    return profiles.courseLevels.filter(v => {
      return v.value !== level;
    });
  }
  getSchoolRoles(): any {
    return this.profiles.schoolRoles;
  }
  getCourseLevels(): any {
    return this.profiles.courseLevels;
  }
  getKinships(): any {
    return this.profiles.kinships;
  }

  getVoluntaries(): any {
    return this.profiles.voluntaries;
  }

  changeYearsRange(v1, v2) {
    return this.profiles.courseYears.filter(v => {
      return Number(v.value) >= v1 && Number(v.value) <= v2;
    });
  }

  getYearRangeByLevel(level) {
    if (level == "f1") {
      return this.changeYearsRange(4, 5);
    } else if (level == "f2") {
      return this.changeYearsRange(6, 9);
    } else if (level == "medio") {
      return this.changeYearsRange(1, 3);
    } else if (level == "superior") {
      return this.changeYearsRange(1, 7);
    } else if (level == "eja") {
      return this.changeYearsRange(1, 9);
    }
    return null;
  }

  getFoundExamplesFake(contact) {
    return this.profiles.foundExamples.filter(v => {
      return v.contact === contact;
    });
  }

  getSchoolBasicInfo(arg0: any): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/profile/school-institutional/${arg0}`)
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

  getProfileByContact(profileType, contact) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.apiUrl}/profile/${profileType}/contact?address=${contact}`,
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

  createProfile(typeProfile, form) {
    console.log(this.headers);
    console.log(form);
    console.log(typeProfile);
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiUrl}/profile/${typeProfile}`, form, this.headers)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  levelChanged(ev) {
    if (ev == "f1") {
      return this.changeYearsRange(4, 5);
    } else if (ev == "f2") {
      return this.changeYearsRange(6, 9);
    } else if (ev == "medio") {
      return this.changeYearsRange(1, 3);
    } else if (ev == "superior") {
      return this.changeYearsRange(1, 7);
    }
  }
}
