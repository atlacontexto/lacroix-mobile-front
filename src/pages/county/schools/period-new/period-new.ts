import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClassroomsProvider } from "../../../../providers/classrooms/classrooms";
import profiles from "../../../../fakedb/profiles";
import { SchoolYear } from "../../../../app/model/school-year";
import { SchoolYearProvider } from "../../../../providers/school-year/school-year";
import { AlertProvider } from "../../../../providers/alert-service/alert-service";
import { Period } from "../../../../app/model/period";

/**
 * Generated class for the PeriodNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-period-new",
  templateUrl: "period-new.html"
})
export class PeriodNewPage {
  form: FormGroup;
  expectedRegime: { value: string; showValue: string; periods: number };
  schoolYear: SchoolYear;
  period: Period;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public _classroomProvider: ClassroomsProvider,
    public _schoolYearProvider: SchoolYearProvider,
    public _alertProvider: AlertProvider
  ) {
    if (this.navParams.get("period")) {
      this.period = Object.assign(new Period(), this.navParams.get("period"));
      console.log(this.period);
    }
    this.schoolYear = Object.assign(
      new SchoolYear(),
      this.navParams.get("schoolYear")
    );
    this.expectedRegime = profiles.periods.find(
      el => el.value == navParams.get("regime")
    );
    this.form = this.formBuilder.group({
      owner: [
        this.schoolYear.$county,
        Validators.compose([Validators.required])
      ],
      schoolYear: [
        this.schoolYear.id,
        Validators.compose([Validators.required])
      ],
      createdBy: [
        navParams.get("createdBy"),
        Validators.compose([Validators.required])
      ],
      start: [null, Validators.compose([Validators.required])],
      end: [null, Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PeriodNewPage");
  }

  savePeriod() {
    console.log(this.form);
    if (this.form.valid) {
      this._schoolYearProvider
        .savePeriod(this.form.value)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
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
