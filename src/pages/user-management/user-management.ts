import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ModalController,
  Events
} from "ionic-angular";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HomePage } from "../home/home";
import { Keyboard } from "@ionic-native/keyboard";
import { UserProvider } from "../../providers/user/user";
import { User } from "../../app/model/user";
import { ProfilesProvider } from "../../providers/profiles/profiles";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import { ProfilesComponent } from "./profiles/profiles";

/**
 * Generated class for the UserBasicInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-user-management",
  templateUrl: "user-management.html"
})
export class UserManagementPage implements OnInit, OnDestroy {
  @ViewChild(ProfilesComponent)
  child: ProfilesComponent = null;

  userInfo: any;
  form: FormGroup;
  isReady: boolean;
  step = "user";
  statusUser: boolean;
  statusProfile = true;
  showFooter = true;
  showProfiles: Array<any>;
  showStart = false;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserProvider,
    public platform: Platform,
    public key: Keyboard,
    public modalCtrl: ModalController,
    public events: Events,
    public _profilesProvider: ProfilesProvider
  ) {
    this._unsubscribeAll = new Subject();
    this.userService.user.subscribe(user => {
      if (user instanceof User) {
        this.statusProfile = false;
      }
    });
  }

  ngOnInit(): void {
    this._profilesProvider.listProfiles
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profiles => profiles && profiles.length > 0)
      )
      .subscribe(() => {
        this.showStart = true;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
          this.step = "profile";
        }
      }
    });
    profileModal.present();
  }

  switchSegment(ev) {
    this.step = ev;
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

  showHelp() {
    this.child.showHelpAction();
  }
}
