import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import profiles from "../../../../../fakedb/profiles";
import geo from "../../../../../fakedb/geo";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { GeoProvider } from "../../../../../providers/geo/geo";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { Subject } from "rxjs";
import { UserProvider } from "../../../../../providers/user/user";
import { filter, takeUntil } from "rxjs/operators";
import { User } from "../../../../../app/model/user";

/**
 * Generated class for the ProfileCreateSchoolComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-school",
  templateUrl: "profile-create-school.html"
})
export class ProfileCreateSchoolComponent implements OnInit, OnDestroy {
  @Output()
  formSchoolSubmited = new EventEmitter();
  formSchool: FormGroup;
  roles: any;
  states: any;
  counties: any;
  schools: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private geoProvider: GeoProvider,
    private alertProvider: AlertProvider,
    private userService: UserProvider
  ) {
    this._unsubscribeAll = new Subject();
    this.formSchool = this.formBuilder.group({
      user: [null, Validators.compose([Validators.required])],
      role: [null, Validators.compose([Validators.required])],
      hasSchool: [false, Validators.required],
      school: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    console.log("OnInit Create School");
    this.userService.user
      .pipe(
        filter(user => user instanceof User),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(user => {
        console.log(user);
        this.formSchool.controls["user"].setValue(user.id);
      });
    this.roles = this.profilesProvider.getSchoolRoles();
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
        this.alertProvider.loading.dismiss();
      });
  }

  countyChanged(countyId) {
    this.profilesProvider
      .getSchoolsByCounty(countyId)
      .then(schools => {
        this.schools = schools;
      })
      .catch(err => {
        console.error(err);
      });
  }

  onSubmit() {
    console.log(this.formSchool.value);
    if (this.formSchool.valid) {
      this.profilesProvider
        .createProfile("school", this.formSchool.value)
        .then(res => {
          console.log(res);
          if (res["success"]) {
            this.alertProvider.presentAlert(
              "Perfil de Gestão Escolar criado!",
              "Aproveite para se conectar à sua escola e à gestão Municipal",
              "Ok"
            );
            this.formSchoolSubmited.emit();
          }
        })
        .catch(err => {
          console.error(err);
          this.alertProvider.presentAlert(
            "Erro ao criar Perfil de Gestão Escolar criado",
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
