import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PersonalProvider } from "../../../../providers/personal/personal";
import { GeoProvider } from "../../../../providers/geo/geo";
import { AlertController } from "ionic-angular";
import { UserProvider } from "../../../../providers/user/user";

/**
 * Generated class for the PersonalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "personal",
  templateUrl: "personal.html"
})
export class PersonalComponent implements OnInit, OnDestroy {
  personalForm: FormGroup;
  text: string;
  states: any;
  genders = [
    { value: "m", viewValue: "Masculino" },
    { value: "f", viewValue: "Feminino" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private _personalProvider: PersonalProvider,
    private _geoProvider: GeoProvider,
    private alertCtrl: AlertController,
    private _userProvider: UserProvider
  ) {
    this.personalForm = this.formBuilder.group({
      name: [null, Validators.required],
      born: [null],
      gender: [null],
      rg: [null],
      rg_uf: [null],
      cpf: [null]
    });
  }

  onSubmit() {
    if (this.personalForm.valid) {
      if (this._userProvider.user.value.$people) {
        this._personalProvider
          .updatePeople(this.personalForm.value)
          .then(() => {
            let updateSuccess = this.alertCtrl.create({
              title: "Informaçõea atualizadas",
              message: "Suas informações foram atualizadas com sucesso",
              buttons: ["OK"]
            });
            updateSuccess.present();
          })
          .catch(err => {
            let updateError = this.alertCtrl.create({
              title: "Erro na atualização",
              message:
                "Ocorreu um erro na atualização das suas informações pessoais. Tente Novamente mais tarde",
              buttons: ["OK"]
            });
            updateError.present();
          });
      } else {
        this._personalProvider
          .createPeople(this.personalForm.value)
          .then(() => {
            let createSuccess = this.alertCtrl.create({
              title: "Informações cadastradas!",
              message:
                "Suas informações pessoais foram cadastradas com sucesso."
            });
            createSuccess.present();
          })
          .catch(err => {
            let createFailed = this.alertCtrl.create({
              title: "Falha no cadastro",
              message:
                "Ocorreu um erro interno no cadastramento de suas informações pessoais. Tente novamente mais tarde.",
              buttons: ["OK"]
            });
            createFailed.present();
          });
      }
    } else {
      let addressAlert = this.alertCtrl.create({
        title: "Informações incompletas",
        message: "Suas informações estão incompletas. Por favor, corrija-as.",
        buttons: ["OK"]
      });
      addressAlert.present();
    }
  }

  ngOnInit(): void {
    this.states = this._geoProvider.getStates();
    this._personalProvider
      .getPeople()
      .then(people => {
        if (people) {
          this.personalForm.controls["name"].setValue(people.name);
          this.personalForm.controls["born"].setValue(people.born);
          this.personalForm.controls["gender"].setValue(people.gender);
          this.personalForm.controls["rg"].setValue(people.rg);
          this.personalForm.controls["rg_uf"].setValue(people.rg_uf);
          this.personalForm.controls["cpf"].setValue(people.cpf);
        }
      })
      .catch(error => {
        console.log(error);
        let getFailed = this.alertCtrl.create({
          title: "Erro na recuperação",
          message:
            "Houve uma falha na recuperação das suas informações pessoais. Tente novamente mais tarde.",
          buttons: ["OK"]
        });
        getFailed.present();
      });
  }
  ngOnDestroy(): void {}
}
