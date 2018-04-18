import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanningDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-detail',
  templateUrl: 'planning-detail.html',
})
export class PlanningDetailPage {

  type: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    if(navParams.get('planning'))
      this.type = navParams.get('planning')['type'];
    console.log(this.type);
  }

  

}
