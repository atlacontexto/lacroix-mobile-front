import {
  Component,
  Output,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { GeoProvider } from "../../../../../providers/geo/geo";
import { ProfileCreatePage } from "../../../../../pages/user-management/profiles/profile-create/profile-create";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { Subject } from "rxjs";

/**
 * Generated class for the ProfileCreateCountyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-county",
  templateUrl: "profile-create-county.html"
})
export class ProfileCreateCountyComponent implements OnInit, OnDestroy {
  formCounty: FormGroup;
  @Output()
  formCountySubmited = new EventEmitter();
  states: { id: number; name: string; abbr: string }[];
  counties: any;
  roles: { value: number; viewValue: string }[];
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(ProfileCreatePage) private parentPage: ProfileCreatePage,
    private profilesProvider: ProfilesProvider,
    private geoProvider: GeoProvider,
    private alertProvider: AlertProvider
  ) {
    this._unsubscribeAll = new Subject();
    this.parentPage.form.addControl(
      "county",
      new FormControl(null, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl(
      "role",
      new FormControl(null, Validators.compose([Validators.required]))
    );
  }

  ngOnInit(): void {
    this.roles = this.profilesProvider.getCountyRoles();
    this.states = this.geoProvider.getStates(1);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  stateChanged(stateId) {
    this.alertProvider.presentControlledLoader(
      "Atualizando lista de cidades..."
    );
    this.geoProvider
      .getCountiesByState(stateId)
      .then(counties => {
        this.counties = counties;
        this.alertProvider.loading.dismiss();
      })
      .catch(err => {
        console.log(err);
        this.alertProvider.loading.dismiss();
      });
  }

  onSubmit() {
    console.log(this.parentPage.form.value);
    if (this.parentPage.form.valid) {
      this.profilesProvider
        .createProfile("county", this.parentPage.form.value)
        .then(res => {
          console.log(res);
          if (res["success"]) {
            this.alertProvider.presentAlert(
              "Perfil da Gestão da Rede de Ensino!",
              "Aproveite para criar provas, planejamentos e materiais didáticos",
              "Ok"
            );
          }
        })
        .catch(err => {
          console.error(err);
          this.alertProvider.presentAlert(
            "Erro ao criar Perfil da Gestão da Rede de Ensino",
            "Não foi possível criar seu perfil agora. Tente novamente mais tarde",
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
}
