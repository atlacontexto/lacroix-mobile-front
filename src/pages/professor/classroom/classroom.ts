import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DailyPage } from '../daily/daily';

/**
 * Generated class for the ClassroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-classroom',
  templateUrl: 'classroom.html',
})
export class ClassroomPage {

  private profile: any;
  private items = [
    {data:'21/04/2018', absence:'5'},
    {data:'23/04/2018', absence:'4'},
    {data:'24/04/2018', absence:'2'},
    {data:'25/04/2018', absence:'3'},
    {data:'26/04/2018', absence:'4'},
    {data:'27/04/2018', absence:'1'},
    {data:'28/04/2018', absence:'4'},
    {data:'02/05/2018', absence:'3'},
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.profile = navParams.get('profileSelected');
    console.log(this.profile);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassroomPage');
  }

  itemSelected(event) {

  }

  getItems(event) {

  }

  newDaily() {
    this.navCtrl.push('DailyPage',{professorId: this.profile['_id']},{
      animate: true,
      direction: 'forward'
    })
  }
}
