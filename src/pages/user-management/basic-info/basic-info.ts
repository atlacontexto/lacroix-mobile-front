import { Component, Input, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AlertProvider } from "../../../providers/alert-service/alert-service";
import { UserProvider } from "../../../providers/user/user";
import { User } from "../../../app/model/user";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { AuthProvider } from "../../../providers/auth/auth";
import { LoadingController, AlertController } from "ionic-angular";

/**
 * Generated class for the BasicInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "basic-info",
  templateUrl: "basic-info.html"
})
export class BasicInfoComponent {
  @Input()
  form: FormGroup;
  formPersonal: FormGroup;
  cellphone: string;

  items: any = [];
  @Output()
  eventEmmit = new EventEmitter<string>();

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserProvider,
    public alertService: AlertProvider,
    public profilesProvider: ProfilesProvider,
    public authService: AuthProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.cellphone = this.authService.cellphone.value;
    this.items = [{ viewValue: "CONTA", value: "account", expanded: false }];

    this.form = this.formBuilder.group(
      {
        peopleId: [null],
        name: [null, Validators.required],
        userId: [null],
        shortName: [
          { value: "", disabled: false },
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9_-]{8,15}$")
          ])
        ],
        password: [
          "",
          Validators.compose([Validators.required, Validators.min(8)])
        ],
        confirmPassword: [
          "",
          Validators.compose([Validators.required, Validators.min(8)])
        ]
      },
      { validator: this.matchingPasswords("password", "confirmPassword") }
    );

    this.formPersonal = this.formBuilder.group({
      name: [null],
      gender: [null],
      rg: [null],
      uf: [null],
      cpf: [null]
    });
  }

  ngAfterContentInit() {
    let getLoading = this.loadingCtrl.create({
      content: "Buscando..."
    });
    getLoading.present();
    this.expandItem(this.items[0]);

    if (this.authService.getDecodedAccessToken("token")) {
      this.userService
        .buildUser()
        .then(() => {
          let user = this.userService.user.value;
          if (user instanceof User) {
            this.items = [
              { viewValue: "CONTA", value: "account", expanded: false },
              {
                viewValue: "INFORMAÇÕES PESSOAIS",
                value: "personal",
                expanded: false
              },
              { viewValue: "ENDEREÇO", value: "address", expanded: false },
              { viewValue: "ASSINATURA", value: "billing", expanded: false }
            ];
            getLoading.dismiss();
            let toast = this.alertService.toastCtrl.create({
              message: `Olá ${user.$people.$name}`,
              duration: 2000
            });
            toast.present();
            this.cellphone = user.$mainContact.$address;
            this.form.get("shortName").disable();

            this.form.controls["peopleId"].setValue(user.$people.id);
            this.form.controls["name"].setValue(user.$people.$name);
            this.form.controls["userId"].setValue(user.id);
            this.form.controls["shortName"].setValue(user.$shortName);

            if (user.getProfiles().length == 0) {
              this.requestForCreateProfile();
            }
          }
        })
        .catch(err => {
          console.log(err);
          getLoading.dismiss();
          let getFailed = this.alertCtrl.create({
            title: "Erro na busca",
            message:
              "Ocorreu um erro na busca por suas informações de Endereço. Por favor, tente novamente mais tarde.",
            buttons: ["Ok"]
          });
          getFailed.present();
        });
    } else {
      getLoading.dismiss();
      this.form.controls["shortName"].enable();
      let toast = this.alertService.toastCtrl.create({
        message: "Cadastro de novo usuário",
        duration: 2000
      });
      toast.present();
    }
  }

  expandItem(item) {
    this.items.map(listItem => {
      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      return listItem;
    });
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
    };
  }

  requestForCreateProfile() {
    let requestForProfile = this.alertService.alertCtrl.create({
      title: "Crie um perfil!",
      message:
        "Vá em Perfis > Novo Perfil e escolha o perfil que mais se adequa a você.",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.eventEmmit.emit("profile");
          }
        }
      ]
    });
    requestForProfile.present();
  }

  updateInfo(value) {
    // this.eventEmmit.emit();
    this.form.get("shortName").enable();
    console.log(this.form.value);
    this.alertService.presentControlledLoader(
      "Atualizando suas informações..."
    );
    if (value === "account") {
      if (this.form.valid) {
        this.userService
          .update(this.form.value)
          .then(result => {
            if (result["success"]) {
              localStorage.setItem("userId", this.form.value.userId);
              localStorage.setItem("shortName", this.form.value.shortName);
              localStorage.setItem("peopleId", this.form.value.peopleId);
              localStorage.setItem("name", this.form.value.name);
            }

            this.userService.buildUser().then(() => {
              let infoUpdatedAlert = this.alertService.alertCtrl.create({
                title: "Informações Atualizadas com sucesso!",
                message:
                  "Suas informações foram atualizadas e logo serão vistas pelo sistema.",
                buttons: [
                  {
                    text: "Ok",
                    handler: () => {
                      if (
                        this.userService.user.value instanceof User &&
                        !this.userService.user.value.hasProfiles()
                      ) {
                        this.requestForCreateProfile();
                      }
                    }
                  }
                ]
              });
              infoUpdatedAlert.present();
            });
          })
          .catch(err => {
            if (err.error.code === 11000) {
              switch (err.error.data.fields) {
                case "shortName":
                  this.alertService.presentAlert(
                    "Escolha outro Nome de Usuário",
                    `${
                      this.form.value["shortName"]
                    } já está em uso. Escolha outro e tente novamente`,
                    "Ok"
                  );

                  break;

                default:
                  break;
              }
            } else {
              this.alertService.presentAlert(
                "Erro crítico",
                "Suas informações não foram atualizadas. Tente novamente mais tarde.",
                "Ok"
              );
            }
          });
      } else {
        this.alertService.presentAlert(
          "Informações incorretas",
          `Verifique usas informações básicas de usuário: Todos os campos são obrigatórios e a senha deve ter entre 8 e 15 caracteres, entre números e letras.`,
          "OK"
        );
      }
    } else if (value === "address") {
    } else if (value === "personal") {
    }
    this.alertService.loading.dismiss();
  }
}
