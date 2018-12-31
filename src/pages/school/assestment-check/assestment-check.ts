import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import { Profile } from "../../../app/model/profile";

/**
 * Generated class for the AssestmentCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-assestment-check",
  templateUrl: "assestment-check.html"
})
export class AssestmentCheckPage {
  private _unsubscribeAll: Subject<any>;
  profile: Profile;
  professors: any;
  currentProfile: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _profilesProvider: ProfilesProvider,
    public alertCtrl: AlertController
  ) {
    this._unsubscribeAll = new Subject();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AssestmentCheckPage");
  }

  ngOnInit(): void {
    this._profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        this.currentProfile = profile;
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
