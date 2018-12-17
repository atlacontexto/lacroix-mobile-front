import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  Inject
} from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { Subject } from "rxjs";
import { ProfileCreatePage } from "../profile-create";
import { GeoProvider } from "../../../../../providers/geo/geo";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";

/**
 * Generated class for the ProfileCreateComunityComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-comunity",
  templateUrl: "profile-create-comunity.html"
})
export class ProfileCreateComunityComponent implements OnInit, OnDestroy {
  formComunity: FormGroup;
  @Output() formComunitySubmited = new EventEmitter();
  voluntaries: any;
  private _unsubscribeAll: Subject<any>;
  states: any;
  levels: any;
  counties: {};

  constructor(
    @Inject(ProfileCreatePage) private parentPage: ProfileCreatePage,
    private _profilesProvider: ProfilesProvider,
    private _geoProvider: GeoProvider,
    private _alertProvider: AlertProvider
  ) {
    this._unsubscribeAll = new Subject();

    this.parentPage.form.addControl("type", new FormControl(null));
    this.parentPage.form.addControl("voluntary", new FormControl(null));
    this.parentPage.form.addControl("representant", new FormControl(null));
    this.parentPage.form.addControl(
      "county",
      new FormControl(null, Validators.compose([Validators.required]))
    );
  }

  ngOnInit(): void {
    this.voluntaries = this._profilesProvider.getVoluntaries();
    this.states = this._geoProvider.getStates(1);
    this.levels = this._profilesProvider.getCourseLevels();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  stateChanged(stateId) {
    this._alertProvider.presentControlledLoader(
      "Atualizando lista de cidades..."
    );
    this._geoProvider
      .getCountiesByState(stateId)
      .then(counties => {
        this.counties = counties;
        this._alertProvider.loading.dismiss();
      })
      .catch(err => {
        console.log(err);
        this._alertProvider.loading.dismiss();
      });
  }

  onSubmit() {
    if (this.parentPage.form.valid) {
      this._profilesProvider
        .createProfile("comunity", this.parentPage.form.value)
        .then(res => {
          if (res["success"]) {
            this._alertProvider.presentAlert(
              "Perfil de Comunidade criado!",
              "Acompanhe as informações sobre a rede de ensino do seu município",
              "Ok"
            );
            this.formComunitySubmited.emit();
          }
        })
        .catch(err => {
          console.error(err);
          this._alertProvider.presentAlert(
            "Erro ao criar Perfil de Comunidade",
            "Não foi possível criar seu pefil agora. Informe esse problema no grupo de testes e tente novamente mais tarde",
            "OK"
          );
        });
    } else {
      this._alertProvider.presentAlert(
        "Informações incompletas",
        "Preencha os campos obrigatórios",
        "Ok"
      );
    }
  }
}
