import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Subject } from "rxjs";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { takeUntil, filter } from "rxjs/operators";
import { Profile } from "../../../app/model/profile";

/**
 * Generated class for the PlanningCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-planning-check",
  templateUrl: "planning-check.html"
})
export class PlanningCheckPage implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  currentProfile: any;
  currentInstitution: any;
  content: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _profilesProvider: ProfilesProvider
  ) {
    this._unsubscribeAll = new Subject();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PlanningCheckPage");
  }

  ngOnInit(): void {
    this._profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        this.currentProfile = profile;
        this.content = "plan";
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
