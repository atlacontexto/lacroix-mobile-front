import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ProfilesProvider } from "../../providers/profiles/profiles";
import { takeUntil, filter } from "rxjs/operators";
import { Subject } from "rxjs";
import { Profile } from "../../app/model/profile";

/**
 * Generated class for the AuthorizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-authorization",
  templateUrl: "authorization.html"
})
export class AuthorizationPage implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  step: string;
  profile: any;
  requests: any;
  institution: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public alertCtrl: AlertController
  ) {
    this._unsubscribeAll = new Subject();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AuthorizationPage");
  }

  ngOnInit(): void {
    this.profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        console.log(profile);
        this.profile = profile;
        if (this.profile.$profileType == "ProfileSchool") {
          this.institution = profile.school;
          this.updateRequestings();
        } else if (this.profile.$profileType == "ProfileCounty") {
          this.institution = profile.county;
          this.updateRequestings();
        } else if (this.profile.$profileType == "ProfileProfessor") {
          this.institution = profile.school;
        }
        if (this.institution && this.institution.status == "accepted") {
          this.step = "pending";
        }
      });
  }

  updateRequestings() {
    if (this.profile.$profileType == "ProfileSchool") {
      this.profilesProvider
        .getSchoolProfessorsRequestings(this.profile["school"].requested._id)
        .then(res => {
          this.requests = res;
        })
        .catch(err => {
          let requestingErrorAlert = this.alertCtrl.create({
            title: "Erro na recuperação de solicitações",
            message: "Ocorreu um erro interno. Tente novamente depois"
          });
          requestingErrorAlert.present();
        });
    } else if (this.profile.$profileType == "ProfileCounty") {
      this.profilesProvider
        .getSchoolManagersRequestings(this.profile["county"].requested._id)
        .then(res => {
          this.requests = res;
        })
        .catch(err => {
          let requestingErrorAlert = this.alertCtrl.create({
            title: "Erro na recuperação de solicitações",
            message: "Ocorreu um erro interno. Tente novamente depois"
          });
          requestingErrorAlert.present();
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSegmentChange() {
    console.log("segment changed");
    this.updateRequestings();
  }

  openHelp() {
    this.navCtrl.push("HelpCenterPage", { source: "Autorização" });
  }
}
