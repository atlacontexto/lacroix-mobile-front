import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Profile } from "../../../app/model/profile";
import { SubjectsProvider } from "../../../providers/subjects/subjects";

/**
 * Generated class for the PlanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-planning",
  templateUrl: "planning.html"
})
export class PlanningPage implements OnInit, OnDestroy {
  materias: Array<{
    title: string;
    component: any;
    description: any;
    icon: string;
  }>;

  private _unsubscribeAll: Subject<any>;
  private profile: Profile;
  subjects: Array<{ id: number; value: string; viewValue: string }>;
  year: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _profilesProvider: ProfilesProvider,
    private subjectsProvider: SubjectsProvider
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.subjects = this.subjectsProvider.getSubjectsFake();
    this._profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this.profile = profile;
        this.subjects = this.subjects.filter(x =>
          profile.subjects.includes(x.value)
        );
        this.year = this._profilesProvider.getCourseYear(this.profile["serie"]);
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  ionViewWillEnter() {}

  openPlanning(page) {
    this.navCtrl.push(
      "PlanningListPage",
      { title: page.viewValue },
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  open(planning?) {
    this.navCtrl.push(
      "PlanningDetailPage",
      { planning: planning },
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  openBncc() {
    this.navCtrl.push("BnccPage", { subjects: this.subjects, year: this.year });
  }
}
