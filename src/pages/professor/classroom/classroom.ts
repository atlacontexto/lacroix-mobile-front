import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { Subject } from "rxjs";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { filter, takeUntil } from "rxjs/operators";
import { Profile } from "../../../app/model/profile";
import { ClassroomsProvider } from "../../../providers/classrooms/classrooms";
import { AlertProvider } from "../../../providers/alert-service/alert-service";

/**
 * Generated class for the ClassroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-classroom",
  templateUrl: "classroom.html"
})
export class ClassroomPage {
  private profile: any;
  private _unsubscribeAll: Subject<any>;
  classroom: any;
  frequencies: any;
  isInitialized: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public classroomProvider: ClassroomsProvider,
    public alertCtrl: AlertController,
    public _alertProvider: AlertProvider
  ) {
    this._unsubscribeAll = new Subject();
  }

  ionViewWillEnter() {
    console.log("WillEnter Frequência");
    if (this.isInitialized) {
      this.isInitialized = false;
    } else {
      this.updateFrequencies();
    }
  }

  updateFrequencies() {
    if (this.classroom) {
      this.getFrequencies(this.classroom._id);
    }
  }

  ngOnInit(): void {
    console.log("OnInit");
    this.isInitialized = true;
    this.profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this.profile = profile;
        if (this.profile.classroom != null) {
          this.classroomProvider
            .getClassroomById(this.profile.classroom)
            .then(res => {
              this.classroom = res;
              this.getFrequencies(this.classroom._id);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  }

  getFrequencies(_id: any): any {
    this._alertProvider.presentControlledLoader(
      "Buscando lista de chamadas..."
    );
    this.classroomProvider
      .getClassroomFrequencie(_id)
      .then(res => {
        this.frequencies = res;
        for (const key in this.frequencies) {
          let a = Object.values(this.frequencies[key]["students"]).filter(
            v => v == false
          ).length;

          this.frequencies[key]["absence"] = a;
        }
        this._alertProvider.loading.dismiss();
      })
      .catch(err => {
        this._alertProvider.loading.dismiss();
        console.error(err);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  editFrequency(frequency) {
    this.navCtrl.push(
      "DailyPage",
      { frequency: frequency },
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  errorMessage() {
    let alertFrequency = this.alertCtrl.create({
      title: "Funcionalidade ainda não implementada",
      message: "Aguarde atualização",
      buttons: ["Ok"]
    });
    alertFrequency.present();
  }

  getItems(event) {}

  newFrequency() {
    this.navCtrl.push(
      "DailyPage",
      {},
      {
        animate: true,
        direction: "forward"
      }
    );
  }
}
