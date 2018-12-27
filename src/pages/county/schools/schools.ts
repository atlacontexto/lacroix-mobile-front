import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { Profile } from "../../../app/model/profile";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import { ClassroomsProvider } from "../../../providers/classrooms/classrooms";
import profiles from "../../../fakedb/profiles";
import { SchoolYear } from "../../../app/model/school-year";
import { SchoolYearProvider } from "../../../providers/school-year/school-year";

/**
 * Generated class for the SchoolsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-schools",
  templateUrl: "schools.html"
})
export class SchoolsPage implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  schools: any;
  profile: any;
  institution: any;
  step = "schools";
  schoolYears: SchoolYear[] = new Array();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public _classroomProvider: ClassroomsProvider,
    public _schoolYearProvider: SchoolYearProvider
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
        console.log(profile);
        if (this.profile.$profileType == "ProfileCounty") {
          this.institution = profile.county;
          if (this.institution.status == "accepted") {
            this.profilesProvider
              .getSchoolsProfiles()
              .then(schools => {
                this.schools = schools;
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      });

    this._schoolYearProvider.haveSchoolYearsUpdated
      .pipe(
        filter(value => value == true),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(value => {
        console.log(value);
        this.getSchoolYeasByCounty();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSegmentChange(ev) {
    console.log(ev.value);
    if (ev.value == "schoolYear") {
      this.getSchoolYeasByCounty();
    }
  }

  getSchoolYeasByCounty(): any {
    this._schoolYearProvider
      .getSchoolYearByCounty(this.profile.county.requested._id)
      .then(res => {
        console.log(res);
        res.forEach(element => {
          element.regime = profiles.periods.find(
            el => el.value == element.regime
          );
          this.schoolYears.push(Object.assign(new SchoolYear(), element));
        });
        console.log(this.schoolYears);
        this.schoolYears = res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  openHelp() {
    this.navCtrl.push("HelpCenterPage", { source: "Escolas" });
  }

  openSchoolClassRooms(id) {
    console.log(id);
    this.navCtrl.push("ClassroomListPage", { school: id });
  }

  addSchoolYear() {
    this.navCtrl.push("SchoolYearPage");
  }

  openYear(year) {
    this.navCtrl.push("SchoolYearPage", { schoolYear: year });
  }
}
