import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../../providers/auth/auth";
import { AlertProvider } from "../../../providers/alert-service/alert-service";

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
    public authService: AuthProvider,
    public alertService: AlertProvider
  ) {
    this.cellphone = this.navParams.get("cellphone");
    this.form = formBuilder.group({
      code: ["", Validators.required]
    });
  }

  back() {
    this.navCtrl.pop({ direction: "back" });
  }

  resend() {
    this.authService
      .sendSms(this.form.value)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  next() {
    this.authService
      .checkCode(this.form.value)
      .then(res => {
        if (res["success"]) {
          this.navCtrl.push(
            "UserManagementPage",
            { cellphone: this.cellphone, step: "user", user: res["data"] },
            {
              animate: true,
              direction: "forward"
            }
          );
        } else if (res === "code expired") {
          let expiredAlert = this.alertService.alertCtrl.create({
            title: "Erro na validação",
            message: "Seu código expirou. Um novo código será enviado.",
            buttons: [
              {
                text: "Ok",
                handler: data => {
                  this.resend();
                }
              }
            ]
          });
        } else {
          this.alertService.presentAlert(
            "Erro na validação",
            "Tente mais tarde",
            "OK"
          );
        }
      })
      .catch(err => {
        let message;
        if (err.error.message == "Invalid code.") {
          message = "seu código está incorreto";
        } else if (err === "code expired") {
          message = "seu código expirou";
        }
        this.alertService.presentAlert(
          "Erro na validação",
          `Desculpe, mas ${message}. Volte ao início e tente novamente`,
          "OK"
        );
      });
  }
}
