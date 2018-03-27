import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the UserBasicInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-basic-info',
  templateUrl: 'user-basic-info.html',
})
export class UserBasicInfoPage {

  form: FormGroup;
  isReady: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider
  ) {
    this.form = formBuilder.group({
      cellphone: ['', Validators.required],
      fullName: ['', Validators.required],
      shortName: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReady = this.form.valid;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserBasicInfoPage');
  }

  updateUser() {
    this.userService.update(this.form.value).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.error(err);
    });

    this.navCtrl.setRoot(HomePage,{},{
      animate: true,
      direction: 'forward'
    })
  }

}
