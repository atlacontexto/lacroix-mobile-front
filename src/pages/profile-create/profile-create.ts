import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the ProfileCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-create',
  templateUrl: 'profile-create.html',
})
export class ProfileCreatePage {

  profileType: string;
  formParent: FormGroup;
  formProfessor: FormGroup;
  items: Array<{title: string, checked: boolean, formControl: string}>;
  level: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder
  ) {
    this.items = [
      {title:'Arte', checked: false, formControl: 'arte'},
      {title:'Ciências', checked: false, formControl: 'ciencias'},
      {title:'Educação Física', checked: false, formControl: 'edfisica'},
      {title:'Filosofia', checked: false, formControl: 'filosofia'},
      {title:'Geografia', checked: false, formControl: 'geografia'},
      {title:'História', checked: false, formControl: 'historia'},
      {title:'Língua Portuguesa', checked: false, formControl: 'lportuguesa'},
      {title:'Matemática', checked: false, formControl: 'matematica'},
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileCreatePage');
  }

  typeChanged() {
    console.log('evento levantado ' + this.profileType);
    if (this.profileType == 'pai') {
      this.formParent = this.formBuilder.group({
        profileType: ['pai', Validators.required],
        cgm: ['', Validators.required],
      });
    } else if (this.profileType == 'professor') {
      this.formProfessor = this.formBuilder.group({
        profileType: ['professor', Validators.required],
        level: ['', Validators.required],
        arte: ['', Validators.required],
        ciencias: ['', Validators.required],
        edfisica: ['', Validators.required],
        filosofia: ['', Validators.required],
        geografia: ['', Validators.required],
        historia: ['', Validators.required],
        lportuguesa: ['', Validators.required],
        matematica: ['', Validators.required],
      });
    }
  }

  dismiss() {
    if (this.profileType == 'pai') {
      console.log(this.formParent.value);
      this.viewCtrl.dismiss(this.formParent.value);
    } else if (this.profileType == 'professor') {
      this.formProfessor.controls['level'].setValue(this.level);
      console.log(this.formProfessor.value);
      this.viewCtrl.dismiss(this.formProfessor.value);
    }
  }

}
