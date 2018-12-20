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
import { AlertProvider } from "../../providers/alert-service/alert-service";

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
  _idSchool: any;
  currentClassroom: any;
  constructor(
    public _classroomProvider: ClassroomsProvider,
    public _profilesProvider: ProfilesProvider,
    public _alertProvider: AlertProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this._unsubscribeAll = new Subject();
    this._idSchool = this.navParams.get("school");
  }

  ngOnInit(): void {
    this._profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this._alertProvider.presentControlledLoader(
          "Buscando detalhes da turma..."
        );
        this.profile = profile;
        this.classroom = this.navParams.get("classroom");
        console.log(this.profile);
        if (this.classroom == null && this.profile.classrooms.length > 0) {
          this.currentClassroom = this.profile.classrooms[0]._id;
          this.getClassroomInfo(this.profile.classrooms[0]._id);
        } else if (this.classroom != null) {
          this.getEnrollments(this.classroom._id);
          this.getRequests();
        }
        this._alertProvider.loading.dismiss();
      });
  }

  getClassroomInfo(id?) {
    if (!id) {
      id = this.currentClassroom;
    }
    this._classroomProvider
      .getClassroomById(id)
      .then(res => {
        this.classroom = res;
        this.getEnrollments(this.classroom._id);
        this.getRequests();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRequests(): any {
    if (this._idSchool == null) {
      this._idSchool = this.profile.school.requested._id;
    }
    this._profilesProvider
      .getSchoolProfessorsRequestings(this._idSchool)
      .then(res => {
        this.requests = res;
        // this.requests = res.filter(profile =>
        //   this.classroom.series.includes(profile.requesting.serie)
        // );
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
    this._classroomProvider
      .getEnrollments(_id)
      .then(res => {
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
    this._classroomProvider
      .activateProfessor(id, this.classroom._id)
      .then(res => {
        this.getRequests();
      })
      .catch(err => {
        console.log(err);
      });
  }

  deactivateProfessor(id) {
    this._classroomProvider
      .deactivateProfessor(id, this.classroom._id)
      .then(res => {
        this.getRequests();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
