import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Subject } from "rxjs";
import { ProfilesProvider } from "../../../../providers/profiles/profiles";
import { SubjectsProvider } from "../../../../providers/subjects/subjects";
import { PlanningProvider } from "../../../../providers/planning/planning";

/**
 * Generated class for the BnccPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-bncc",
  templateUrl: "bncc.html"
})
export class BnccPage implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  subjects: any;
  subject: any;
  years: any;
  year: any;
  habilities: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subjectsProvider: SubjectsProvider,
    private profilesProvider: ProfilesProvider,
    private planningProvider: PlanningProvider
  ) {
    this._unsubscribeAll = new Subject();
    this.subjects = this.subjectsProvider.getSubjectsFake();
    this.years = this.profilesProvider.getCourseYearsFundamental();
    const value = this.navParams.get("year");
    console.log(this.subjects);
    this.year = value[0]["viewValue"];
    this.subject = this.subjects[0]["viewValue"];
    this.getHabilities();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BnccPage");
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  yearChanged(ev) {
    console.log(ev);
    console.log(this.year);
    this.getHabilities();
  }
  subjectChanged(ev) {
    console.log(ev);
    console.log(this.subject);
    this.getHabilities();
  }

  getHabilities() {
    this.planningProvider
      .getHabilities(this.year, this.subject)
      .then(res => {
        this.habilities = res["habilities"];
      })
      .catch(err => {
        console.log(err);
      });
  }
}
