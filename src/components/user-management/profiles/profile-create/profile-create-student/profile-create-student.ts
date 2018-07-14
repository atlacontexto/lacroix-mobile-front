import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { GeoProvider } from "../../../../../providers/geo/geo";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { ModalController } from "ionic-angular";
import { UserServiceProvider } from "../../../../../providers/user-service/user-service";

/**
 * Generated class for the ProfileCreateStudentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-student",
  templateUrl: "profile-create-student.html"
})
export class ProfileCreateStudentComponent {
  formStudent: FormGroup;
  levelSelected: any;
  @Output() formStudentSubmited = new EventEmitter();
  levels: { value: string; viewValue: string }[];
  years: any;
  counties: any;
  schools: any;
  states: any;
  parent: { name: string; photo: string; contact: string; id: string };

  constructor(
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private geoProvider: GeoProvider,
    private alertProvider: AlertProvider,
    private modalCtrl: ModalController,
    private userService: UserServiceProvider
  ) {
    this.formStudent = this.formBuilder.group({
      userId: [this.userService.getUserAtt("_id")],
      level: [null, Validators.compose([Validators.required])],
      year: [null, Validators.compose([Validators.required])],
      hasSchool: [false, Validators.compose([Validators.required])],
      school: [null],
      hasParent: [false, Validators.compose([Validators.required])],
      parentContact: [null],
      parentId: [null]
    });
  }

  ngAfterContentInit() {
    this.states = this.geoProvider.getStates();
    this.levels = this.profilesProvider.getCourseLevelsExcept("infantil");
  }

  levelChanged(ev) {
    if (ev == "f1") {
      this.years = this.profilesProvider.changeYearsRange(4, 5);
    } else if (ev == "f2") {
      this.years = this.profilesProvider.changeYearsRange(6, 9);
    } else if (ev == "medio") {
      this.years = this.profilesProvider.changeYearsRange(1, 3);
    } else if (ev == "superior") {
      this.years = this.profilesProvider.changeYearsRange(1, 7);
    } else if (ev == "eja") {
      this.years = this.profilesProvider.changeYearsRange(1, 9);
    }
  }

  stateChanged(stateId) {
    this.alertProvider.presentControlledLoader(
      "Atualizando lista de cidades..."
    );
    this.geoProvider
      .getCountiesByState(stateId)
      .then(counties => {
        this.counties = counties["data"]["profiles"];
        this.counties.sort((a, b) => {
          if (a.external_id > b.external_id) {
            return 1;
          }
          if (a.external_id < b.external_id) {
            return -1;
          }
          return 0;
        });
        this.alertProvider.loading.dismiss();
      })
      .catch(err => {
        this.alertProvider.loading.dismiss();
      });
  }

  countyChanged(countyId) {
    this.geoProvider
      .getSchoolsByCounty(countyId)
      .then(res => {
        this.schools = res["data"]["schools"];
      })
      .catch(err => {
        console.error(err);
      });
  }

  onSubmit() {
    if (this.formStudent.valid) {
      this.profilesProvider
        .createProfile("student", this.formStudent.value)
        .then(res => {
          if (res["success"]) {
            this.alertProvider.presentAlert(
              "Perfil de Aluno criado!",
              "Aproveite para se conectar à sua escola e professores",
              "Ok"
            );
            this.formStudentSubmited.emit();
          }
        })
        .catch(err => {
          console.error(err);
          this.alertProvider.presentAlert(
            "Erro ao criar Perfil de Aluno",
            "Não foi possível criar seu pefil agora. Tente novamente mais tarde",
            "OK"
          );
        });
    } else {
      this.alertProvider.presentAlert(
        "Informações incompletas",
        "Preencha os campos obrigatórios",
        "Ok"
      );
    }
  }

  onInputTime(data) {
    if (data.value) {
      this.alertProvider.presentControlledLoader("Buscando por contato...");
      // this.parent = this.profilesProvider.getFoundExamplesFake(data.value)[0];
      this.profilesProvider
        .getProfileByContact("parent", data.value)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
      this.alertProvider.loading.dismiss();
      if (!this.parent) {
        this.alertProvider.presentAlert(
          "Usuário não encontrado",
          "Gostaria de enviar um convite? Certifique de que o contato está correto",
          "Ok"
        );
        console.log(this.formStudent.value.parentContact);
      } else {
        this.formStudent.controls["parentId"].setValue(this.parent.id);
      }
    }
  }

  viewProfile(profileId) {
    const profileModal = this.modalCtrl.create("ProfileShowPage", {
      profileId: profileId
    });
    profileModal.present();
  }
}
