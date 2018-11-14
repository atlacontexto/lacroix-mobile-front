import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { takeUntil, filter } from "rxjs/operators";
import { Subject } from "rxjs";
import { ProfilesProvider } from "../../providers/profiles/profiles";
import { Profile } from "../../app/model/profile";
import { ClassroomsProvider } from "../../providers/classrooms/classrooms";

/**
 * Generated class for the ClassroomDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-classroom-detail",
  templateUrl: "classroom-detail.html"
})
export class ClassroomDetailPage implements OnInit, OnDestroy {
  classroom: any;
  show = "students";
  private _unsubscribeAll: Subject<any>;
  requests: any;
  profile: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public alertCtrl: AlertController,
    public classroomProvider: ClassroomsProvider
  ) {
    this._unsubscribeAll = new Subject();
    this.classroom = this.navParams.get("classroom");
    console.log(this.classroom);
  }

  ngOnInit(): void {
    this.profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        console.log(profile);
        this.profile = profile;

        this.profilesProvider
          .getRequestings(profile.school.requested._id)
          .then(res => {
            console.log(res);
            this.requests = res.filter(profile =>
              this.classroom.series.includes(profile.requesting.serie)
            );
          })
          .catch(err => {
            console.error(err);
            let requestingErrorAlert = this.alertCtrl.create({
              title: "Erro na recuperação de solicitações",
              message: "Ocorreu um erro interno. Tente novamente mais tarde."
            });
            requestingErrorAlert.present();
          });
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openEnrollment(student) {
    this.navCtrl.push("EnrollmentDetailPage", { student: student });
  }

  activateProfessor(id) {
    this.classroomProvider
      .activateProfessor(id, this.classroom._id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
