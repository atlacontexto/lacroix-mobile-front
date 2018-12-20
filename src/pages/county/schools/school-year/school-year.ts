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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public _alertProvider: AlertProvider,
    public _classroomProvider: ClassroomsProvider,
    public _profilesProvider: ProfilesProvider
  ) {
    this.form = this.formBuilder.group({});
    this._unsubscribeAll = new Subject();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SchoolYearPage");
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
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSelectChange(event) {
    this.form = this.formBuilder.group({});
    this.periods = new Array();
    for (let i = 1; i <= event.periods; i++) {
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
      new FormControl(
        this.regime.value,
        Validators.compose([Validators.required])
      )
    );
    this.form.addControl(
      "periods",
      new FormControl(
        this.regime.periods,
        Validators.compose([Validators.required])
      )
    );
    if (this.form.valid) {
      this._classroomProvider
        .createSchoolYear(this.form.value, this.profile.county.requested._id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err)
          this._alertProvider.presentAlert(
            "Erro no salvamento do Ano Letivo",
            "Entre em contato com o suporte e tente novamente mais tarde",
            "Ok"
          );
        });
    } else {
      this._alertProvider.presentAlert(
        "Campos obrigatórios",
        "Todos os campos são obrigatórios.",
        "Ok"
      );
    }
  }
}
