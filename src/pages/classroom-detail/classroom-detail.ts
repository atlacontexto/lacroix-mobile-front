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
  students: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public alertCtrl: AlertController,
    public classroomProvider: ClassroomsProvider
  ) {
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
        this.classroom = this.navParams.get("classroom");
        if (this.classroom == null && this.profile.classroom != null) {
          this.classroomProvider
            .getClassroomById(this.profile.classroom)
            .then(res => {
              this.classroom = res;
              this.getEnrollments(this.classroom._id);
              this.getRequests();
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.classroom != null) {
          this.getEnrollments(this.classroom._id);
          this.getRequests();
        }
      });
  }
  getRequests(): any {
    this.profilesProvider
      .getRequestings(this.profile.school.requested._id)
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
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getEnrollments(_id: any): any {
    this.classroomProvider
      .getEnrollments(_id)
      .then(res => {
        console.log(res);
        this.students = res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  openEnrollment(student) {
    this.navCtrl.push("EnrollmentDetailPage", { student: student });
  }

  activateProfessor(id) {
    this.classroomProvider
      .activateProfessor(id, this.classroom._id)
      .then(res => {
        console.log(res);
        this.getRequests();
      })
      .catch(err => {
        console.log(err);
      });
  }

  deactivateProfessor(id) {
    this.classroomProvider
      .deactivateProfessor(id, this.classroom._id)
      .then(res => {
        console.log(res);
        this.getRequests();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
