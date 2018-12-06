import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ClassroomServiceProvider } from "../../../providers/classroom-service/classroom-service";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Profile } from "../../../app/model/profile";
import { ClassroomsProvider } from "../../../providers/classrooms/classrooms";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AlertProvider } from "../../../providers/alert-service/alert-service";

/**
 * Generated class for the DailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-daily",
  templateUrl: "daily.html"
})
export class DailyPage implements OnInit, OnDestroy {
  professorId: string;

  private _unsubscribeAll: Subject<any>;
  profile: any;
  classroom: any;
  students: any;
  frequency: FormGroup;
  currentFrequency: any;
  action: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public classroomService: ClassroomServiceProvider,
    public profilesProvider: ProfilesProvider,
    public classroomProvider: ClassroomsProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public _alertProvider: AlertProvider
  ) {
    this.frequency = formBuilder.group({
      date: [null, Validators.compose([Validators.required])]
    });

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this.profile = profile;
        this.currentFrequency = this.navParams.get("frequency");
        console.log(this.currentFrequency);
        if (this.currentFrequency == null && this.profile.classroom != null) {
          this.classroomProvider
            .getClassroomById(this.profile.classroom)
            .then(res => {
              this.classroom = res;
              this.getEnrollments(this.classroom._id);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (
          this.currentFrequency != null &&
          this.profile.classroom != null
        ) {
          this.frequency.controls["date"].setValue(
            this.currentFrequency["date"]
          );
          this.action = "edit";
          this.getEnrollmentsEdit(
            this.currentFrequency,
            this.profile.classroom
          );
        }
      });
  }

  getEnrollmentsEdit(currentFrequency, _id: any): any {
    this._alertProvider.presentControlledLoader("Buscando Matrículas...");
    this.classroomProvider
      .getEnrollments(_id)
      .then(res => {
        res.forEach(element => {
          this.frequency.addControl(
            element.basic.CGM,
            new FormControl(currentFrequency.students[element.basic.CGM])
          );
          this.frequency.addControl(
            element.basic.CGM + "_obs",
            new FormControl(
              currentFrequency.students[element.basic.CGM + "_obs"]
            )
          );
        });
        this._alertProvider.loading.dismiss();
        this.students = res;
      })
      .catch(err => {
        this._alertProvider.loading.dismiss();
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getEnrollments(_id: any): any {
    this._alertProvider.presentControlledLoader("Buscando Matrículas...");
    this.classroomProvider
      .getEnrollments(_id)
      .then(res => {
        res.forEach(element => {
          this.frequency.addControl(element.basic.CGM, new FormControl(true));
          this.frequency.addControl(
            element.basic.CGM + "_obs",
            new FormControl(null)
          );
        });
        this._alertProvider.loading.dismiss();
        this.students = res;
      })
      .catch(err => {
        this._alertProvider.loading.dismiss();
        console.log(err);
      });
  }

  saveFrequency() {
    if (this.frequency.valid) {
      this.classroomProvider
        .setFrequency(this.frequency.value, this.classroom._id)
        .then(res => {
          let alertFrequency = this.alertCtrl.create({
            title: "Nova chamada salva",
            buttons: ["Ok"]
          });
          alertFrequency.present();
        })
        .catch(err => {
          let alertFrequency = this.alertCtrl.create({
            title: "Erro ao salvar",
            message: "Tente novamente depois.",
            buttons: ["Ok"]
          });
          alertFrequency.present();
        });
    } else {
      let alertFrequency = this.alertCtrl.create({
        title: "Informe a data",
        message: "Tente novamente.",
        buttons: ["Ok"]
      });
      alertFrequency.present();
    }
  }

  editFrequency() {
    let alertFrequency = this.alertCtrl.create({
      title: "Funcionalidade ainda não implementada",
      message: "Aguarde atualização",
      buttons: ["Ok"]
    });
    alertFrequency.present();
  }
}
