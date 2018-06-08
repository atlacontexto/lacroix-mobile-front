import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { AlertServiceProvider } from "../../providers/alert-service/alert-service";

/**
 * Generated class for the RegisterPhoneCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register-phone-check",
  templateUrl: "register-phone-check.html"
})
export class RegisterPhoneCheckPage {
  form: FormGroup;
  cellphone: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthServiceProvider,
    public alertService: AlertServiceProvider
  ) {
    this.cellphone = this.navParams.get("cellphone");
    this.form = formBuilder.group({
      code: ["", Validators.required]
    });
  }

  back() {
    this.navCtrl.pop({ direction: "back" });
  }

  resend() {}

  next() {
    console.log("WHAAAAAT?");
    this.authService
      .checkCode(this.form.value)
      .then(res => {
        if (res["success"]) {
          console.log(res["data"]);
          this.navCtrl.push(
            "UserBasicInfoPage",
            { cellphone: this.cellphone, step: "user", user: res["data"] },
            {
              animate: true,
              direction: "forward"
            }
          );
        } else {
          this.alertService.presentAlert(
            "Erro na validação",
            "Tente mais tarde",
            "OK"
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
