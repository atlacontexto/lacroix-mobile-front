import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  Inject
} from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { GeoProvider } from "../../../../../providers/geo/geo";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { ModalController } from "ionic-angular";
import { UserProvider } from "../../../../../providers/user/user";
import { AuthProvider } from "../../../../../providers/auth/auth";
import { Profile } from "../../../../../app/model/profile";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { User } from "../../../../../app/model/user";
import { ProfileCreatePage } from "../profile-create";

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
export class ProfileCreateStudentComponent implements OnInit, OnDestroy {
  formStudent: FormGroup;
  levelSelected: any;
  @Output()
  formStudentSubmited = new EventEmitter();
  levels: { value: string; viewValue: string }[];
  years: any;
  counties: any;
  schools: any;
  states: any;
  parent: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(ProfileCreatePage) private parentPage: ProfileCreatePage,
    private profilesProvider: ProfilesProvider,
    private geoProvider: GeoProvider,
    private alertProvider: AlertProvider,
    private modalCtrl: ModalController,
    private userService: UserProvider
  ) {
    this._unsubscribeAll = new Subject();
    this.parentPage.form.addControl(
      "user",
      new FormControl(null, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl(
      "level",
      new FormControl(null, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl(
      "year",
      new FormControl(null, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl(
      "hasSchool",
      new FormControl(false, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl("school", new FormControl(null));
    this.parentPage.form.addControl(
      "hasParent",
      new FormControl(false, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl("parentContact", new FormControl(null));
    this.parentPage.form.addControl("parentId", new FormControl(null));
    console.log(this.parentPage.form.value);
  }

  ngOnInit(): void {
    console.log("OnInit Create Student");
    this.userService.user
      .pipe(
        filter(user => user instanceof User),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(user => {
        this.parentPage.form.controls["user"].setValue(user.id);
      });
    this.states = this.geoProvider.getStates();
    this.levels = this.profilesProvider.getCourseLevelsExcept("infantil");
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
    console.log(this.parentPage.form.value);
    if (this.parentPage.form.valid) {
      this.profilesProvider
        .createProfile("student", this.parentPage.form.value)
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
      this.profilesProvider
        .getProfileByContact("parent", data.value)
        .then(res => {
          this.parent = res;

          this.parentPage.form.controls["parentId"].setValue(
            this.parent.profile._id
          );
        })
        .catch(err => {
          console.error(err);
          this.alertProvider.presentAlert(
            "Usuário não encontrado",
            "Gostaria de enviar um convite? Certifique de que o contato está correto",
            "Ok"
          );
        });
      this.alertProvider.loading.dismiss();
    }
  }

  viewProfile(profileId) {
    this.parentPage.viewProfile(profileId, this.parent);
  }
}
