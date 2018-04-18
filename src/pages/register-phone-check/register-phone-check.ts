import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';

/**
 * Generated class for the RegisterPhoneCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-phone-check',
  templateUrl: 'register-phone-check.html',
})
export class RegisterPhoneCheckPage {

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthServiceProvider,
    public alertService: AlertServiceProvider
  ) {
    this.form = formBuilder.group({
      code: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPhoneCheckPage');
  }

  next() {
    this.authService.checkCode(this.form.value).then((res) => {
      console.log(res);
      if (res['success']) {
        console.log(res['message']);
        this.navCtrl.push('UserBasicInfoPage', { step: 'user', user: res['data'] }, {
          animate: true,
          direction: 'forward'
        });
      } else {
        this.alertService.presentAlert('Erro na validação', 'Tente mais tarde', 'OK');
      }
    }).catch(err => {
      console.log(err);
    });
  }

}
