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

@IonicPage()
@Component({
  selector: 'page-user-basic-info',
  templateUrl: 'user-basic-info.html',
})
export class UserBasicInfoPage {

  form: FormGroup;
  isReady: boolean;
  step: string;
  statusUser = true;
  statusProfile = true;
  statusLink = true;
  showFooter = true;
  items: Array<{ title: string, component: any, description: any, icon: string }>;
  item = { title: '', component: 'ProfileCreatePage' };

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
      { title: 'Pai', description: 'Amélia Ferreira Camacam', component: 'ProfileEditPage', icon: 'home' },
      { title: 'Professor', description: 'Regente 1 | Escola Municipal Parigot de Souza', component: 'ProfileEditPage', icon: 'home' },
      { title: 'Escola', description: 'Diretora', component: 'ProfileEditPage', icon: 'home' },
      { title: 'Aluno', description: '1º Ano | Escola Municipal Parigot de Souza', component: 'ProfileEditPage', icon: 'home' },
      { title: 'Município', description: 'Chefe Departamento Pedagógico', component: 'ProfileEditPage', icon: 'home' }
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
