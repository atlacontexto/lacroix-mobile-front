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
const MAX_TIME = 60;
@IonicPage()
@Component({
  selector: "page-register-phone-check",
  templateUrl: "register-phone-check.html"
})
export class RegisterPhoneCheckPage {
  form: FormGroup;
  cellphone: string;
  maxTime: any = MAX_TIME;
  timer: any;
  hidevalue: any;

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

  ionViewDidLoad() {
    this.StartTimer();
  }

  StartTimer() {
    this.timer = setTimeout(x => {
      if (this.maxTime <= 0) {
      }
      this.maxTime -= 1;

      if (this.maxTime > 0) {
        this.hidevalue = false;
        this.StartTimer();
      } else {
        this.hidevalue = true;
      }
    }, 1000);
  }

  back() {
    this.navCtrl.setRoot("RegisterPhonePage", {
      animate: true,
      direction: "forward"
    });
  }

  showWaitAlert() {
    let waitAlert = this.alertService.alertCtrl.create({
      title: "Aguarde",
      message:
        "Estamos enviando o código de validação para seu celular. Caso não receba, pode tentar reenviar para seguir com o acesso.",
      buttons: ["OK"]
    });
    waitAlert.present();
  }

  resend() {
    this.authService
      .sendSms({ cellphone: this.cellphone })
      .then(data => {
        let value = Number(localStorage.getItem("resentTime"));
        this.maxTime = MAX_TIME * value;
        localStorage.setItem("resentTime", String(value + 1));
        this.StartTimer();
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
          this.authService.cellphone.next(this.cellphone);
          this.navCtrl.setRoot(
            "UserManagementPage",
            {},
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
          expiredAlert.present();
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
