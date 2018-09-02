import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning',
  templateUrl: 'planning.html',
})
export class PlanningPage {

  materias: Array<{ title: string, component: any, description: any, icon: string }>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.materias = [
      { title: 'Arte', description: '', component: 'PlanningListPage', icon: 'home' },
      { title: 'Ciências', description: '', component: 'PlanningListPage', icon: 'home' },
      { title: 'Educação Física', description: '', component: 'PlanningListPage', icon: 'home' },
      { title: 'Filosofia', description: '', component: 'PlanningListPage', icon: 'home' },
      { title: 'Geografia', description: '', component: 'PlanningListPage', icon: 'home' },
      { title: 'História', description: '', component: 'PlanningListPage', icon: 'home' },
      { title: 'Língua Portuguesa', description: '', component: 'PlanningListPage', icon: 'home' },
      { title: 'Matemática', description: '', component: 'PlanningListPage', icon: 'home' }
    ]
  }

  openPlanning(page) {
    this.navCtrl.push(page.component, { title: page.title }, {
      animate: true,
      direction: 'forward'
    })
  }

  open(planning?) {

    this.navCtrl.push('PlanningDetailPage', { planning: planning }, {
      animate: true,
      direction: 'forward'
    })
  }

}
