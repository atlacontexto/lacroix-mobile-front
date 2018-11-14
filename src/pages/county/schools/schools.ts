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
        console.log(profile);

        this.profilesProvider
          .getSchoolsProfiles()
          .then(schools => {
            console.log(schools);
            this.schools = schools;
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  ngOnDestroy(): void {}
}
