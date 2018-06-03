import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ModalController,
  Events
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { HomePage } from "../home/home";
import { Keyboard } from "@ionic-native/keyboard";

/**
 * Generated class for the UserBasicInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-user-basic-info",
  templateUrl: "user-basic-info.html"
})
export class UserBasicInfoPage {
  userInfo: any;
  form: FormGroup;
  isReady: boolean;
  step = "user";
  statusUser: boolean;
  statusProfile: boolean;
  statusLink: boolean;
  showFooter = true;
  showProfiles: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public platform: Platform,
    public key: Keyboard,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    console.log("UserBasicInfo loaded");
    this.events.subscribe("app:userinfoupdated", userinfo => {
      if (userinfo["statusProfile"]) {
        this.statusProfile = false;
      }
      if (userinfo["step"]) this.step = userinfo["step"];
    });
    // console.log(this.navParams.get("user"));
    // if (false) {
    //   localStorage.setItem(
    //     "userId",
    //     this.navParams.get("user")["profile"]["user"]["_id"]
    //   );
    //   this.showProfiles = new Array<{
    //     type: string;
    //     component?: any;
    //     description?: any;
    //     icon?: string;
    //   }>();
    //   var profiles = this.navParams.get("user")["profile"]["user"]["profiles"];
    //   profiles.forEach(element => {
    //     var title = "";
    //     if (element["type"] == "countym") {
    //       title = "GESTÃO MUNICIPAL";
    //     } else if (element["type"] == "schoolm") {
    //       title = "GESTÃO ESCOLAR";
    //     } else if (element["type"] == "professor") {
    //       title = "PROFESSOR";
    //     } else if (element["type"] == "parent") {
    //       title = "RESPONSÁVEL";
    //     } else if (element["type"] == "student") {
    //       title = "ALUNO";
    //     }
    //     this.showProfiles.push(
    //       Object.assign(element, {
    //         title: title,
    //         component: "ProfileEditPage",
    //         icon: "assets/imgs/placeholder.png"
    //       })
    //     );
    //   });
    //   this.events.publish("app:profiles", this.showProfiles);
    //   var peopleId = this.navParams.get("user")["profile"]["user"]["people"][
    //     "_id"
    //   ];
    //   var name = this.navParams.get("user")["profile"]["user"]["people"][
    //     "name"
    //   ];
    //   var userId = this.navParams.get("user")["profile"]["user"]["_id"];
    //   var shortName = this.navParams.get("user")["profile"]["user"][
    //     "shortName"
    //   ];
    // }
    const user = this.navParams.get("user");
    const _cellphone = this.navParams.get("cellphone");
    this.userInfo = { cellphone: _cellphone, ...user };

    // this.form = formBuilder.group({
    //   peopleId: [peopleId],
    //   name: [name, Validators.required],
    //   userId: [userId],
    //   shortName: [shortName, Validators.required]
    // });
    // this.form.valueChanges.subscribe(v => {
    //   this.isReady = this.form.valid;
    // });
  }

  ionViewWillEnter() {
    // this.step = this.navParams.get("step") || "user";
    // if (this.step == "user") {
    //   this.statusUser = false;
    // }
    // if (this.step == "profile") {
    //   this.statusProfile = false;
    // }
    // if (this.step == "link") {
    //   this.statusLink = false;
    // }
  }

  openModal(page) {
    let profileModal = this.modalCtrl.create(
      page.component,
      { profile: page },
      { enableBackdropDismiss: true }
    );
    profileModal.onDidDismiss(data => {
      if (data) {
        if (data["profileType"]) {
          this.step = "link";
          this.statusLink = true;
        }
      }
    });
    profileModal.present();
  }

  updateUser() {
    this.userService
      .update(this.form.value)
      .then(result => {
        // console.log(result);
      })
      .catch(err => {
        // console.error(err);
      });

    this.step = "profile";
    this.statusProfile = false; // Habilida a oção 'Perfil' do segment
    // this.navCtrl.setRoot(HomePage, {}, {
    //   animate: true,
    //   direction: 'forward'
    // })
  }

  start() {
    this.navCtrl.setRoot(
      HomePage,
      {},
      {
        animate: true,
        direction: "forward"
      }
    );
  }
}
