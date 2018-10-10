import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { User } from "../../../../app/model/user";
import { Profile } from "../../../../app/model/profile";
import { ProfilesProvider } from "../../../../providers/profiles/profiles";
import { UserProvider } from "../../../../providers/user/user";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import { People } from "../../../../app/model/people";
import { ProfileSchoolInstitutional } from "../../../../app/model/profile-school-institutional";

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
export class ProfileShowPage implements OnInit, OnDestroy {
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

  private _unsubscribeAll: Subject<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public userProvider: UserProvider
  ) {
    this._unsubscribeAll = new Subject();
    if (this.navParams.get("name")) {
      this.userIn = new User();
      this.userIn.$shortName = this.navParams.get("shortName");
      let people = new People();
      people.$name = this.navParams.get("name");
      this.userIn.$people = people;
    } else if (this.navParams.get("profileId")) {
      this.getProfile(this.navParams.get("profileId"));
    } else if (this.navParams.get("school")) {
      this.userIn = this.navParams.get("school");
      console.log(this.userIn);
      this.getProfile(this.userIn["_id"]);
    }
  }

  getProfile(arg0: any): any {
    this.profilesProvider
      .getProfile(arg0)
      .then(res => {
        this.profile = Object.assign(
          new ProfileSchoolInstitutional(),
          res["profile"]
        );
        console.log(this.profile);
      })
      .catch(err => {
        console.error(err);
      });
  }

  ngOnInit(): void {
    console.log("Profile Show Initied");
    this.profilesProvider.showingProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        console.log(profile);
        this.profile = profile;
      });

    if (!this.userIn) {
      this.userProvider.user
        .pipe(
          takeUntil(this._unsubscribeAll),
          filter(user => user instanceof User)
        )
        .subscribe(user => {
          console.log(user);
          this.userIn = user;
        });
    }
  }

  ngOnDestroy(): void {
    console.log("Profile Show closed");
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  isUser(): boolean {
    return this.userIn instanceof User;
  }

  openSchool(school) {
    console.log(school);
    this.navCtrl.push("ProfileShowPage", { school: school });
  }

  openCounty(county) {
    console.log(county);
    this.navCtrl.push("ProfileShowPage", { county: county });
  }

  isInstitution() {
    return this.profile instanceof ProfileSchoolInstitutional;
  }
}
