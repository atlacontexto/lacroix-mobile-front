import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the UserBasicInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Slide {
  title: string;
  description: string;
}

@IonicPage()
@Component({
  selector: 'page-user-basic-info',
  templateUrl: 'user-basic-info.html',
})
export class UserBasicInfoPage {

  slides: Slide[];
  form: FormGroup;
  isReady: boolean;
  step: string;
  statusUser = true;
  statusProfile = true;
  statusLink = true;
  showFooter = true;
  items: Array<{ title: string, component: any, description: any, icon: string }>;
  item = { title: '', component: 'ProfileCreatePage' };
  showHelp = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public platform: Platform,
    public key: Keyboard,
    public modalCtrl: ModalController
  ) {
    this.items = [
      { title: 'Pai', description: 'Amélia Ferreira Camacam', component: 'ProfileEditPage', icon: 'assets/imgs/placeholder.png' },
      { title: 'Professor', description: 'Regente 1 | Escola Municipal Parigot de Souza', component: 'ProfileEditPage', icon: 'assets/imgs/placeholder.png' },
      { title: 'Escola', description: 'Diretora', component: 'ProfileEditPage', icon: 'assets/imgs/placeholder.png' },
      { title: 'Aluno', description: '5º Ano | Escola Municipal Parigot de Souza', component: 'ProfileEditPage', icon: 'assets/imgs/placeholder.png' },
      { title: 'Município', description: 'Chefe Departamento Pedagógico', component: 'ProfileEditPage', icon: 'assets/imgs/placeholder.png' }
    ]
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

  ionViewWillEnter() {
    this.slides = [
      {
        title: "Perfil para Alunos",
        description: "Texto explicativo do uso de perfis para Alunos",
      },
      {
        title: "Perfil para Pais",
        description: "Texto explicativo do uso de perfis para Pais e Responsáveis",
      },
      {
        title: "Perfil para Professores",
        description: "Texto explicativo do uso de perfis para Professores",
      },
      {
        title: "Perfil para Gestão Escolar",
        description: "Texto explicativo do uso de perfis para Gestão Escolar",
      },
      {
        title: "Perfil para Administração Municipal",
        description: "Texto explicativo do uso de perfis para Gestão Municipal",
      }
    ]
    this.step = this.navParams.get('step') || 'user';
    if (this.step == 'user') {
      this.statusUser = false;
    }
    if (this.step == 'profile') {
      this.statusProfile = false;
    }
    if (this.step == 'link') {
      this.statusLink = false;
    }
  }

  showHelpAction() {
    if (this.showHelp) {
      this.showHelp = false;
    } else {
      this.showHelp = true;
    }
  }

  openModal(page) {
    let profileModal = this.modalCtrl.create(page.component, { title: page.title }, { enableBackdropDismiss: true });
    profileModal.onDidDismiss(data => {
      if (data) {
        if (data['profileType']) {
          this.step = 'link';
          this.statusLink = true;
        }
      }
    });
    profileModal.present();
  }

  updateUser() {
    this.userService.update(this.form.value).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.error(err);
    });

    this.step = 'profile';
    this.statusProfile = false;
    // this.navCtrl.setRoot(HomePage, {}, {
    //   animate: true,
    //   direction: 'forward'
    // })
  }

  start() {
    this.navCtrl.setRoot(HomePage, {}, {
      animate: true,
      direction: 'forward'
    })
  }

}
