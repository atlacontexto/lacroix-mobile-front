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
      prefix: ["+55", Validators.required],
      cellphone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/\(\d{2}\)\s\d{4,5}-?\d{4}/g)
        ])
      ]
    });
    this.form.valueChanges.subscribe(v => {
      this.isReady = this.form.valid;
    });
  }

  next() {
    let phone = this.form.value.prefix.concat(
      this.form.value.cellphone.match(/\d+/g).join("")
    );
    console.log(phone);
    if (this.isReady) {
      this.authService
        .sendSms({ cellphone: phone })
        .then(data => {
          this.navCtrl.setRoot(
            "RegisterPhoneCheckPage",
            {
              cellphone: phone,
              via: data["via"]
            },
            {
              animate: true,
              direction: "forward"
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let incorrectNumber = this.alertService.alertCtrl.create({
        title: "Número incorreto",
        message:
          "Por favor, verifique seu número.  \n Ele deve seguir o formato (00)00000-0000",
        buttons: ["OK"]
      });
      incorrectNumber.present();
    }
  }
}
