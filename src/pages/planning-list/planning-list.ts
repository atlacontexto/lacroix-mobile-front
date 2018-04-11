import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanningListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning-list',
  templateUrl: 'planning-list.html',
})
export class PlanningListPage {

  title: string;
  ptds: Array<{title: string}>
  plannings: Array<{ date: string, title: string, description: string }>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get('title');

  }

  ionViewWillEnter() {
    this.ptds = [
      {title: '1º BIMESTRE'},
      {title: '2º BIMESTRE'},
      {title: '3º BIMESTRE'},
      {title: '4º BIMESTRE'},
    ]
    this.plannings = [
      {
        date: '06/2 - 8:00 às 9:30',
        title: 'Apresentação da Turma',
        description: 'Primeiro contato com os alunos e entre eles'
      },
      {
        date: '06/2 - 10:00 às 10:30',
        title: 'Recolhimento de materiais',
        description: 'Coleta e organização do material didático'
      },
      {
        date: '06/2 - 10:30 às 11:30',
        title: 'Avaliação Diagnóstica',
        description: 'Português e Matemática'
      },
      {
        date: '07/2 - o dia todo',
        title: 'Hora Atividade',
        description: 'História e Geografia'
      },
      {
        date: '08/2 - o dia todo',
        title: 'Análise textual',
        description: 'Minhas vontades'
      },
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanningListPage');
  }

  open(planning?) {

    this.navCtrl.push('PlanningDetailPage', { planning: planning }, {
      animate: true,
      direction: 'forward'
    })
  }

}
