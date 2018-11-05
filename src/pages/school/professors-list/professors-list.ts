import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { AlertController, NavController } from "ionic-angular";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import { Profile } from "../../../app/model/profile";

/**
 * Generated class for the ProfessorsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "professors-list",
  templateUrl: "professors-list.html"
})
export class ProfessorsListComponent implements OnInit, OnDestroy {
  @Input()
  open: string;
  text: string;
  private _unsubscribeAll: Subject<any>;
  profile: any;
  professors: any;
  constructor(
    public profilesProvider: ProfilesProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        this.profile = profile;

        this.profilesProvider
          .getRequestings(profile.school.requested._id)
          .then(res => {
            console.log(res);
            this.professors = res;
          })
          .catch(err => {
            let requestingErrorAlert = this.alertCtrl.create({
              title: "Erro na recuperação de solicitações",
              message: "Ocorreu um erro interno. Tente novamente depois"
            });
            requestingErrorAlert.present();
          });
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openPage(professor) {
    console.log(professor);
    let page = "AssestmentsListPage";
    if (this.open == "plan") {
      page = "PlanningPage";
    }
    this.navCtrl.push(page, { professor: professor });
  }
}
