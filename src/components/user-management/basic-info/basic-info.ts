import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { Events } from 'ionic-angular';
import { AlertServiceProvider } from '../../../providers/alert-service/alert-service';

/**
 * Generated class for the BasicInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'basic-info',
  templateUrl: 'basic-info.html'
})
export class BasicInfoComponent {

  @Input() cellphone;
  form: FormGroup

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public events: Events,
    public alertService: AlertServiceProvider
  ) {
    this.form = this.formBuilder.group({
      peopleId: [''],
      name: ['', Validators.required],
      userId: [''],
      shortName: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      confirmPassword: ['', Validators.required],
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  updateUser() {
    if (this.form.valid) {
      console.log('valid?');
      console.log(this.form.value);

      this.userService.update(this.form.value).then((result) => {
        console.log(result);
        if (result['success']) {
          this.events.publish('app:userinfoupdated', { step: 'profile', statusProfile: false });
          // Habilida a oção 'Perfil' do segment
          // this.navCtrl.setRoot(HomePage, {}, {
          //   animate: true,
          //   direction: 'forward'
          // })
        }
      }).catch((err) => {
        // console.error(err);
      });
    } else {
      this.alertService.presentAlert('Informações incorretas', `Verifique usas informações básicas de usuário: Todos os campos são obrigatórios e a senha deve ter 6 caracteres`, 'OK');
    }
  }

}
