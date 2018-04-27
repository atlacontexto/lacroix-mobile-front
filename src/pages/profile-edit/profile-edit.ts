import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  profile: any;
  profileType: string;
  disabled = false;
  main = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.profile = navParams.get('profile');
    this.main = this.profile['main'];
    console.log(this.profile);
    if(this.profile['type']) {
      this.disabled = true;
      this.profileType = this.profile['type'];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  start() {

  }

  update() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
