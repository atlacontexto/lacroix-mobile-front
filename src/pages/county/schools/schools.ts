import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProfilesProvider } from "../../../providers/profiles/profiles";

import { Profile } from "../../../app/model/profile";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";

/**
 * Generated class for the SchoolsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-schools",
  templateUrl: "schools.html"
})
export class SchoolsPage implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  schools: any;
  profile: any;
  institution: any;
  step = "schools";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        this.profile = profile;
        console.log(profile);
        if (this.profile.$profileType == "ProfileCounty") {
          this.institution = profile.county;
          if (this.institution.status == "accepted") {
            this.profilesProvider
              .getSchoolsProfiles()
              .then(schools => {
                this.schools = schools;
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openHelp() {
    this.navCtrl.push("HelpCenterPage", { source: "Escolas" });
  }

  openSchoolClassRooms(id) {
    console.log(id);
    this.navCtrl.push("ClassroomListPage", { school: id });
  }
}
