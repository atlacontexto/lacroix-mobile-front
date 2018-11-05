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
  profile: Profile;
  professors: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AssestmentCheckPage");
  }
}
