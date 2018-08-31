import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Profile } from "../../app/model/profile";
import { User } from "../../app/model/user";

/**
 * Generated class for the ProfileShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile-show",
  templateUrl: "profile-show.html"
})
export class ProfileShowPage {
  user = {
    name: "Cosima Niehaus",
    profileImage: "assets/img/avatar/girl-avatar.png",
    coverImage: "assets/img/background/background-5.jpg",
    occupation: "Designer",
    location: "Seattle, WA",
    description:
      "Passionate Designer. Recently focusing on developing mobile hybrid apps and web development.",
    address: "27 King's College Cir, Toronto, ON M5S, Canada",
    phone: "555 555 555",
    email: "cosima@niehaus.com",
    whatsapp: "555 555 555"
  };
  userIn: User;
  profile: Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profile = this.navParams.get("profile");
    this.userIn = this.navParams.get("user");
    console.log(this.profile);
    console.log(this.userIn);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfileFivePage");
  }
}
