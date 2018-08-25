import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile-edit",
  templateUrl: "profile-edit.html"
})
export class ProfileEditPage {
  profile: any;
  profileType: string;
  disabled = false;
  main = false;
  formUpdate: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public userService: UserProvider
  ) {
    this.profile = navParams.get("profile");
    this.main = this.profile["main"];
    this.formUpdate = this.formBuilder.group({
      _id: [this.profile["_id"]],
      main: [this.profile["main"]],
      type: ["", Validators.required]
    });
    console.log(this.profile);
    if (this.profile["profileType"]) {
      this.disabled = true;
      this.profileType = this.profile["profileType"];
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfileEditPage");
  }

  typeChanged() {
    console.log(this.main);
    console.log(this.profileType);
    this.formUpdate.controls["main"].setValue(this.main);
    this.formUpdate.controls["type"].setValue(this.profileType);
  }

  start() {}

  update() {
    console.log(this.formUpdate.value);
    this.userService
      .updateProfile(this.formUpdate.value)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
