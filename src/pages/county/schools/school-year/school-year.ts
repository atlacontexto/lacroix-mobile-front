import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AlertProvider } from "../../../../providers/alert-service/alert-service";
import { ClassroomsProvider } from "../../../../providers/classrooms/classrooms";
import { ProfilesProvider } from "../../../../providers/profiles/profiles";
import { Subject } from "rxjs";
import { Profile } from "../../../../app/model/profile";
import { takeUntil, filter } from "rxjs/operators";
import { SchoolYear } from "../../../../app/model/school-year";
import { SchoolYearProvider } from "../../../../providers/school-year/school-year";

/**
 * Generated class for the SchoolYearPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-school-year",
  templateUrl: "school-year.html"
})
export class SchoolYearPage implements OnInit, OnDestroy {
  year: any;
  regime: any;
  periods: any;
  regimes = [
    { value: "bi", showValue: "Bimestral", periods: 4 },
    { value: "tri", showValue: "Trimestral", periods: 3 },
    { value: "sem", showValue: "Semestral", periods: 2 }
  ];
  form: FormGroup;
  private _unsubscribeAll: Subject<any>;
  profile: any;

  regimeSelected: any;
  schoolYear: SchoolYear;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public _alertProvider: AlertProvider,
    public _classroomProvider: ClassroomsProvider,
    public _profilesProvider: ProfilesProvider,
    public _schoolYearProvider: SchoolYearProvider
  ) {
    this.form = this.formBuilder.group({});
    this._unsubscribeAll = new Subject();
    if (navParams.get("schoolYear")) {
      this.schoolYear = Object.assign(
        new SchoolYear(),
        navParams.get("schoolYear")
      );
    }
    console.log(this.schoolYear);
    if (navParams.get("schoolYear")) {
      this.year = this.schoolYear.$year;
      this.regimeSelected = this.schoolYear.$regime["value"];
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SchoolYearPage");
  }

  addPeriod() {
    this.navCtrl.push("PeriodNewPage", {
      schoolYear: this.schoolYear,
      createdBy: this.profile._id
    });
  }

  editPeriod(period) {
    this.navCtrl.push("PeriodNewPage", {
      schoolYear: this.schoolYear,
      createdBy: this.profile._id,
      period: period
    });
  }

  ngOnInit(): void {
    this._profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        console.log(profile);
        this.profile = profile;
        // if (this.schoolYear) {
        //   this.getSchoolYearDetails();
        // }
      });

    this._schoolYearProvider.haveSchoolYearsUpdated
      .pipe(
        filter(value => value == true),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(value => {
        console.log(value);
        this.getSchoolYearDetails();
      });
  }

  getSchoolYearDetails(): any {
    this._schoolYearProvider
      .getSchoolYearDetail(this.schoolYear.id)
      .then(res => {
        console.log(res);
        this.schoolYear = Object.assign(new SchoolYear(), res);
        console.log(this.schoolYear);
        this.year = res.year;
        this.regime = res.regime;
        this.regimeSelected = res.regime.value;
        this.periods = res.periods;
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    console.log("School Year Has destroyed");
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSelectChange() {
    console.log("OnSelectChange");
    console.log(this.regime);
    this.form = this.formBuilder.group({});
    this.periods = new Array();
    for (let i = 1; i <= this.regime.periods; i++) {
      this.periods.push({ showValue: i + "º", value: i });
      this.form.addControl(
        i + "_start",
        new FormControl(null, Validators.compose([Validators.required]))
      );
      this.form.addControl(
        i + "_end",
        new FormControl(null, Validators.compose([Validators.required]))
      );
    }
  }

  saveYear() {
    this.form.addControl(
      "year",
      new FormControl(this.year, Validators.compose([Validators.required]))
    );
    this.form.addControl(
      "regime",
      new FormControl(this.regime, Validators.compose([Validators.required]))
    );
    this.form.addControl(
      "county",
      new FormControl(
        this.profile.county.requested._id,
        Validators.compose([Validators.required])
      )
    );
    this.form.addControl(
      "createdBy",
      new FormControl(
        this.profile._id,
        Validators.compose([Validators.required])
      )
    );
    // this.form.addControl(
    //   "periods",
    //   new FormControl(
    //     this.regime.periods,
    //     Validators.compose([Validators.required])
    //   )
    // );
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.schoolYear) {
        this._schoolYearProvider
          .updateSchoolYear(this.schoolYear.id, this.form.value)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
            this._alertProvider.presentAlert(
              "Erro no salvamento do Ano Letivo",
              "Entre em contato com o suporte e tente novamente mais tarde",
              "Ok"
            );
          });
      } else {
        this._schoolYearProvider
          .createSchoolYear(this.form.value)
          .then(res => {
            console.log(res);
            this.schoolYear = Object.assign(new SchoolYear(), res);
          })
          .catch(err => {
            console.log(err);
            this._alertProvider.presentAlert(
              "Erro no salvamento do Ano Letivo",
              "Entre em contato com o suporte e tente novamente mais tarde",
              "Ok"
            );
          });
      }
    } else {
      this._alertProvider.presentAlert(
        "Campos obrigatórios",
        "Todos os campos são obrigatórios.",
        "Ok"
      );
    }
  }
}
