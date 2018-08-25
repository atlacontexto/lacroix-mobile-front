import { Component, Input, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserServiceProvider } from "../../../providers/user-service/user-service";
import { Events } from "ionic-angular";
import { AlertProvider } from "../../../providers/alert-service/alert-service";

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
  userInfo;
  form: FormGroup;
  formPersonal: FormGroup;
  cellphone: string;

  items: any = [];
  eventEmmit = new EventEmitter<string>();

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public events: Events,
    public alertService: AlertProvider
  ) {
    this.items = [
      { viewValue: "CONTA", value: "account", expanded: false },
      { viewValue: "INFORMAÇÕES PESSOAIS", value: "personal", expanded: false },
      { viewValue: "ENDEREÇO", value: "address", expanded: false }
    ];

    this.form = this.formBuilder.group(
      {
        peopleId: [""],
        name: ["", Validators.required],
        userId: [""],
        shortName: ["", Validators.required],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6)
          ])
        ],
        confirmPassword: ["", Validators.required]
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
    this.userService
      .getAllUserInfo()
      .then(res => {
        console.log(res["data"]);
        this.userInfo = res["data"];
        console.log(this.userInfo.mainProfile);
        if (this.userInfo.mainProfile) {
          console.log("enviou");
          this.events.publish("app:showstart", true);
        } else {
          this.events.publish("app:showstart", false);
        }
        this.form.controls["peopleId"].setValue(this.userInfo.user.people._id);
        this.form.controls["name"].setValue(this.userInfo.user.people.name);
        this.form.controls["userId"].setValue(this.userInfo.user._id);
        this.form.controls["shortName"].setValue(this.userInfo.user.shortName);
      })
      .catch(err => {
        console.error(err);
      });
    if (!localStorage.getItem("cellphone"))
      localStorage.setItem("cellphone", this.userInfo.cellphone);
    if (this.userInfo.user) {
      // Launched from CodeCheck
      this.cellphone = this.userInfo.cellphone;
      this.form.controls["peopleId"].setValue(this.userInfo.user.people._id);
      this.form.controls["name"].setValue(this.userInfo.user.people.name);
      this.form.controls["userId"].setValue(this.userInfo.user._id);
      this.form.controls["shortName"].setValue(this.userInfo.user.shortName);
    } else {
      // Launched from Home
      this.events.publish("app:userinfoupdated", {
        step: "user",
        statusProfile: true
      });
      this.cellphone = localStorage.getItem("cellphone");
      this.form.controls["peopleId"].setValue(localStorage.getItem("peopleId"));
      this.form.controls["name"].setValue(localStorage.getItem("name"));
      this.form.controls["userId"].setValue(localStorage.getItem("userId"));
      this.form.controls["shortName"].setValue(
        localStorage.getItem("shortName")
      );
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

  updateInfo(value) {
    this.eventEmmit.emit();
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
              this.events.publish("app:user");
              this.events.publish("app:userinfoupdated", {
                statusProfile: false,
                step: "user"
              });
            }
            this.alertService.loading.dismiss();
            this.alertService.presentAlert(
              "Informações Atualizadas com sucesso!",
              "Suas informações foram atualizadas e logo serão vistas pelo sistema.",
              "Ok"
            );
          })
          .catch(err => {
            this.alertService.presentAlert(
              "Erro crítico",
              "Suas informações não foram atualizadas. Tente novamente mais tarde.",
              "Ok"
            );
            console.error(err);
          });
      } else {
        this.alertService.presentAlert(
          "Informações incorretas",
          `Verifique usas informações básicas de usuário: Todos os campos são obrigatórios e a senha deve ter 6 caracteres`,
          "OK"
        );
      }
    } else if (value === "address") {
    } else if (value === "personal") {
    }
    this.alertService.loading.dismiss();
  }
}
