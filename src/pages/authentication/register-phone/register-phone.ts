import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthProvider } from "../../../providers/auth/auth";
import { AlertProvider } from "../../../providers/alert-service/alert-service";

/**
 * Generated class for the RegisterPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register-phone",
  templateUrl: "register-phone.html"
})
export class RegisterPhonePage {
  form: FormGroup;
  isReady: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthProvider,
    public alertService: AlertProvider
  ) {
    this.form = formBuilder.group({
      cellphone: ["", Validators.required]
    });
    this.form.valueChanges.subscribe(v => {
      this.isReady = this.form.valid;
    });
  }

  next() {
    this.authService
      .sendSms(this.form.value)
      .then(data => {
        this.navCtrl.push(
          "RegisterPhoneCheckPage",
          { cellphone: this.form.value.cellphone, via: data["via"] },
          {
            animate: true,
            direction: "forward"
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
}
