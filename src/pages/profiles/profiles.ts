import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profiles",
  templateUrl: "profiles.html"
})
export class ProfilesPage {
  hasBackButton: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hasBackButton = this.navParams.get("modal");
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilesPage");
  }
}
