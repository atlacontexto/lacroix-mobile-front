import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPhoneCheckPage');
  }

  next() {
    var confirm = true;
    var registered = false;
    var user = {cellNumber:"", completeName:"", shortName:"", email:""}
    if(confirm && registered) {
      user.cellNumber = "+55(44)99119-6405";
      user.completeName = "Savio de Oliveira Camacam";
      user.shortName = "saviocamacam";
      user.email = "saviocamacam@gmail.com";

      this.navCtrl.push('UserBasicInfoPage', user, {
        animate: true,
        direction: 'forward'
      });

    } else if(confirm) {
      this.navCtrl.push('UserBasicInfoPage', {}, {
        animate: true,
        direction: 'forward'
      });
    }
  }

}
