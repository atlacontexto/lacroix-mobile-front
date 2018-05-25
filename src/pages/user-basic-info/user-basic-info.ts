import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, Events } from 'ionic-angular';
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

  cellphone: string;
  slides: Slide[];
  form: FormGroup;
  isReady: boolean;
  step: string;
  statusUser = true;
  statusProfile = true;
  statusLink = true;
  showFooter = true;
  showProfiles: Array<any>;
  item = { title: '', component: 'ProfileCreatePage' };
  showHelp = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public platform: Platform,
    public key: Keyboard,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    this.events.subscribe('app:userinfoupdated', (userinfo) => {
      console.log(userinfo);
      this.statusProfile = userinfo['statusProfile'];
      this.step = userinfo['step'];
    });
    console.log(this.navParams.get('user'));
    if (this.navParams.get('user')) {
      localStorage.setItem('userId', this.navParams.get('user')['profile']['user']['_id']);
      this.showProfiles = new Array<{ type: string, component?: any, description?: any, icon?: string }>();
      var profiles = this.navParams.get('user')['profile']['user']['profiles'];
      profiles.forEach(element => {
        var title = "";
        if (element['type'] == 'countym') {
          title = "GESTÃO MUNICIPAL";
        }
        else if (element['type'] == 'schoolm') {
          title = "GESTÃO ESCOLAR";
        }
        else if (element['type'] == 'professor') {
          title = "PROFESSOR";
        }
        else if (element['type'] == 'parent') {
          title = "RESPONSÁVEL";
        }
        else if (element['type'] == 'student') {
          title = "ALUNO";
        }
        this.showProfiles.push(Object.assign(element, { title: title, component: 'ProfileEditPage', icon: 'assets/imgs/placeholder.png' }));
      });
      this.events.publish('app:profiles', this.showProfiles);
      var peopleId = this.navParams.get('user')['profile']['user']['people']['_id'];
      var name = this.navParams.get('user')['profile']['user']['people']['name'];
      var userId = this.navParams.get('user')['profile']['user']['_id'];
      var shortName = this.navParams.get('user')['profile']['user']['shortName'];
    }
    this.cellphone = this.navParams.get('cellphone');
    this.form = formBuilder.group({
      peopleId: [peopleId],
      name: [name, Validators.required],
      userId: [userId],
      shortName: [shortName, Validators.required]
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReady = this.form.valid;
    })
  }

  ionViewWillEnter() {
    this.slides = [
      {
        title: "Perfil para Alunos",
        description: "Texto explicativo do uso de perfis para Alunos",
      },
      {
        title: "Perfil para Responsáveis",
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
    let profileModal = this.modalCtrl.create(page.component, { profile: page }, { enableBackdropDismiss: true });
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
      // console.log(result);
    }).catch((err) => {
      // console.error(err);
    });

    this.step = 'profile';
    this.statusProfile = false; // Habilida a oção 'Perfil' do segment
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
