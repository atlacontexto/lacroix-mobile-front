import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RegisterPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-phone',
  templateUrl: 'register-phone.html',
})
export class RegisterPhonePage {

  form: FormGroup;
  isReady: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthServiceProvider
  ) {
    this.form = formBuilder.group({
      cellphone: ['', Validators.required]
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReady = this.form.valid;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPhonePage');
  }

  next() {
    this.authService.sendSms(this.form.value).then(data => {
      console.log(data)
      this.navCtrl.push('RegisterPhoneCheckPage', {}, {
        animate: true,
        direction: 'forward'
      });
    }).catch(err => {
      console.log(err);
    });
  }

}
