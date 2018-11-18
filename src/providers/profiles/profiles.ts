import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import profiles from "../../fakedb/profiles";
import { ENV } from "@environment";
import { BehaviorSubject } from "rxjs";
import { AuthProvider } from "../auth/auth";
import { Platform } from "ionic-angular";

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

  public showingProfile: BehaviorSubject<any>;
  public currentProfile: BehaviorSubject<any>;
  public listProfiles: BehaviorSubject<any>;

  constructor(
    public http: HttpClient,
    public authProvider: AuthProvider,
    public platform: Platform
  ) {
    console.log("Hello ProfilesProvider Provider");
    this.currentProfile = new BehaviorSubject(null);
    this.listProfiles = new BehaviorSubject(null);
    this.showingProfile = new BehaviorSubject(null);
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
    this.profiles = profiles;
    this.authProvider.isLoggedIn.subscribe(value => {
      if (value) {
        this.headers = {
          headers: { "x-access-token": localStorage.getItem("token") }
        };
      }
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
            let schools = res["data"]["schools"];
            schools.sort((a, b) => {
              if (a.institution.name > b.institution.name) {
                return 1;
              }
              if (a.institution.name < b.institution.name) {
                return -1;
              }
              return 0;
            });
            resolve(schools);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getSchoolsProfiles(): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/profile/school-institutional`, this.headers)
        .subscribe(
          res => {
            let schools = res["data"]["schools"];
            schools.sort((a, b) => {
              if (a.institution.name > b.institution.name) {
                return 1;
              }
              if (a.institution.name < b.institution.name) {
                return -1;
              }
              return 0;
            });
            resolve(schools);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getSchoolProfessorsRequestings(idSchool): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.apiUrl}/profile/school-institutional/${idSchool}/professors`,
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
  getSchoolManagersRequestings(idCounty): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${
            this.apiUrl
          }/profile/county-institutional/${idCounty}/schools/school-managers`,
          this.headers
        )
        .subscribe(
          res => {
            let managers = res["data"];

            managers.sort((a, b) => {
              if (
                a.requesting.user.people.name > b.requesting.user.people.name
              ) {
                return 1;
              }
              if (
                a.requesting.user.people.name < b.requesting.user.people.name
              ) {
                return -1;
              }
              return 0;
            });
            resolve(managers);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getLevelViewName(name) {
    let level = profiles.courseLevels.filter(v => {
      return v.value === name;
    });
    return level[0]["viewValue"];
  }

  getCourseYear(value): any {
    return profiles.courseYears.filter(v => {
      return v.value == value;
    });
  }

  getCourseYearsFundamental() {
    return profiles.courseYears;
  }

  getCourseLevelsExcept(level): any {
    return profiles.courseLevels.filter(v => {
      return v.value !== level;
    });
  }
  getSchoolRoles(): any {
    return this.profiles.schoolRoles;
  }
  getCountyRoles(): any {
    return this.profiles.countyRoles;
  }

  getSchoolRoleByName(name) {
    return this.profiles.schoolRoles.filter(v => {
      return v.value == name;
    });
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

  getProfileByContact(profileType, contact: string) {
    contact = contact.replace(/\+/g, "%2B");
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.apiUrl}/profile/${profileType}/contact?address=${contact}`,
          this.headers
        )
        .subscribe(
          res => {
            console.log(res);
            resolve(res["data"]);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  /**
   * Method getProfile
   * @param {any}
   * @return {Promise}
   */
  getProfile(arg0: any): any {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/profile/${arg0}`, this.headers).subscribe(
        res => {
          resolve(res["data"]);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  createProfile(typeProfile, form) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiUrl}/profile/${typeProfile}`, form, this.headers)
        .subscribe(
          res => {
            this.authProvider
              .updateToken()
              .then(res => {})
              .catch(err => {});
            resolve(res);
          },
          err => {
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

  setCurrentProfile(profile) {
    this.currentProfile.next(profile);
  }

  changeStatus(action: any, id: string): any {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.apiUrl}/link/${id}`, { status: action }, this.headers)
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
