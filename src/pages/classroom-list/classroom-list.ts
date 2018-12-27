import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { Subject } from "rxjs";
import { ProfilesProvider } from "../../providers/profiles/profiles";
import { Profile } from "../../app/model/profile";
import { filter, takeUntil } from "rxjs/operators";
import { ClassroomsProvider } from "../../providers/classrooms/classrooms";
import { AlertProvider } from "../../providers/alert-service/alert-service";
import { SchoolYearProvider } from "../../providers/school-year/school-year";
import { SchoolYear } from "../../app/model/school-year";
import { HttpParams } from "@angular/common/http";

/**
 * Generated class for the ClassroomListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-classroom-list",
  templateUrl: "classroom-list.html"
})
export class ClassroomListPage implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;
  profile: any;
  classrooms: any;
  _schoolId: any;
  isInitialized: any;
  _countyId: any;
  years: SchoolYear[] = new Array();
  yearSelected: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public loadingCtrl: LoadingController,
    public _classroomsProvider: ClassroomsProvider,
    public _alertProvider: AlertProvider,
    public _schoolYear: SchoolYearProvider
  ) {
    this._unsubscribeAll = new Subject();
    this._schoolId = this.navParams.get("school");
  }

  ionViewWillEnter() {
    if (this.isInitialized) {
      this.isInitialized = false;
    } else {
      this.updateClassroomList();
    }
  }

  ngOnInit(): void {
    this.isInitialized = true;
    this.profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        console.log(profile);
        if (this._schoolId == null) {
          this.profile = profile;
          this._schoolId = this.profile.school.requested._id;
          this._countyId = this.profile.school.requested.countyInstitutional;
          this.getSchoolYears(this._countyId);
        }
      });
  }

  getSchoolYears(_countyId: any): any {
    if (_countyId) {
      this._schoolYear
        .getSchoolYearByCounty(_countyId)
        .then(res => {
          console.log(res);
          res.forEach(element => {
            this.years.push(Object.assign(new SchoolYear(), element));
            if (element._id == this.profile.school.requested.currentYear) {
              this.yearSelected = element._id;
            }
          });
          console.log(this.yearSelected);
          this.updateClassroomList();
        })
        .catch(err => {
          console.log(err);
          this._alertProvider.presentAlert(
            "Erro na recuperação de turmas",
            "Tente novamente mais tarde.",
            "Ok"
          );
        });
    }
  }

  updateClassroomList() {
    let params = new HttpParams();
    params = params.set("school", this._schoolId);
    if (this.yearSelected) {
      params = params.set("year", this.yearSelected);
    }

    let getLoading = this.loadingCtrl.create({
      content: "Buscando turmas..."
    });
    getLoading.present();
    this._classroomsProvider
      .getClassRoomsBySchoolId(params)
      .then(res => {
        this.classrooms = res;
      })
      .catch(err => {
        console.error(err);
        this._alertProvider.presentAlert(
          "Erro na recuperação de turmas",
          "Tente novamente mais tarde.",
          "Ok"
        );
      });
    getLoading.dismiss();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openClassroom(classroom) {
    this.navCtrl.push(
      "ClassroomDetailPage",
      { classroom: classroom, school: this._schoolId },
      { animate: true }
    );
  }
}
