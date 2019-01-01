import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { AuthProvider } from "../../providers/auth/auth";
import { AlertProvider } from "../../providers/alert-service/alert-service";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  form: FormGroup;
  isReady: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public alertService: AlertProvider,
    public translateService: TranslateService
  ) {
    this.form = formBuilder.group({
      shortName: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.form.valueChanges.subscribe(v => {
      this.isReady = this.form.valid;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login() {
    if (this.isReady) {
      this.authProvider
        .signin(this.form.value)
        .then(res => {
          if (res.success) {
            this.navCtrl.setRoot(
              "UserManagementPage",
              {},
              {
                animate: true,
                direction: "forward"
              }
            );
          }
        })
        .catch(error => {
          this.translateService
            .get([
              "USER_NOT_FOUND",
              "INCORRECT_PASSWORD",
              "INCORRECT_INFORMATION_TITLE"
            ])
            .subscribe(res => {
              let errorMessage = this.alertService.alertCtrl.create({
                title: res["INCORRECT_INFORMATION_TITLE"],
                message:
                  error.status === 401
                    ? res["INCORRECT_PASSWORD"]
                    : res["USER_NOT_FOUND"],
                buttons: ["OK"]
              });
              errorMessage.present();
            });
        });
    } else {
      this.translateService
        .get(["INCORRECT_INFORMATION_TITLE", "INCORRECT_INFORMATION_MESSAGE"])
        .subscribe(res => {
          let incorrectCredentials = this.alertService.alertCtrl.create({
            title: res["INCORRECT_INFORMATION_TITLE"],
            message: res["INCORRECT_INFORMATION_MESSAGE"],
            buttons: ["OK"]
          });
          incorrectCredentials.present();
        });
    }
  }

  goToPasswordResetPage() {
    this.navCtrl.push("PasswordResetPage");
  }
}
