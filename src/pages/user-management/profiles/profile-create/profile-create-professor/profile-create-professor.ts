import {
  Component,
  Output,
  EventEmitter,
  Inject,
  OnInit,
  OnDestroy
} from "@angular/core";
import { Validators, FormControl } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { GeoProvider } from "../../../../../providers/geo/geo";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { SubjectsProvider } from "../../../../../providers/subjects/subjects";
import { UserProvider } from "../../../../../providers/user/user";
import { ProfileCreatePage } from "../profile-create";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { User } from "../../../../../app/model/user";

/**
 * Generated class for the ProfileCreateProfessorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-professor",
  templateUrl: "profile-create-professor.html"
})
export class ProfileCreateProfessorComponent implements OnInit, OnDestroy {
  @Output()
  formProfessorSubmited = new EventEmitter();
  levels: any;
  years: any;
  schools: any;
  states: any;
  counties: any;
  subjects: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(ProfileCreatePage) private parentPage: ProfileCreatePage,
    private profilesProvider: ProfilesProvider,
    private geoProvider: GeoProvider,
    private alertProvider: AlertProvider,
    private userService: UserProvider,
    private subjectsProvider: SubjectsProvider
  ) {
    this._unsubscribeAll = new Subject();
    this.parentPage.form.addControl("user", new FormControl(null));
    this.parentPage.form.addControl(
      "level",
      new FormControl(null, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl(
      "serie",
      new FormControl(null, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl("hasSchool", new FormControl(null));
    this.parentPage.form.addControl("school", new FormControl(null));
    this.parentPage.form.addControl(
      "subjects",
      new FormControl(null, Validators.compose([Validators.required]))
    );
  }

  ngOnInit(): void {
    console.log("OnInit Create Professor");
    this.userService.user
      .pipe(
        filter(user => user instanceof User),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(user => {
        this.parentPage.form.controls["user"].setValue(user.id);
      });
    this.states = this.geoProvider.getStates(1);
    this.levels = this.profilesProvider.getCourseLevels();
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

  levelChanged(ev) {
    console.log(ev);
    if (ev == "infantil") {
      this.years = this.profilesProvider.changeYearsRangeChildlike();
      console.log(this.years);
    } else if (ev == "f1") {
      this.years = this.profilesProvider.changeYearsRange(1, 5);
      this.subjects = this.subjectsProvider.getSubjectsFake();
    } else if (ev == "f2") {
      this.years = this.profilesProvider.changeYearsRange(6, 9);
      this.subjects = null;
    } else if (ev == "medio") {
      this.years = this.profilesProvider.changeYearsRange(1, 3);
      this.subjects = null;
    } else if (ev == "mediot") {
      this.years = this.profilesProvider.changeYearsRange(1, 4);
      this.subjects = null;
    } else if (ev == "superior") {
      this.years = this.profilesProvider.changeYearsRange(1, 7);
      this.subjects = null;
    }
  }

  onSubmit() {
    if (this.parentPage.form.valid) {
      this.profilesProvider
        .createProfile("professor", this.parentPage.form.value)
        .then(res => {
          if (res["success"]) {
            this.alertProvider.presentAlert(
              "Perfil de Professor criado!",
              "Aproveite para criar provas, planejamentos e materiais didáticos",
              "Ok"
            );
            this.formProfessorSubmited.emit();
          }
        })
        .catch(err => {
          console.error(err);
          this.alertProvider.presentAlert(
            "Erro ao criar Perfil de Professor",
            "Não foi possível criar seu pefil agora. Informe esse problema no grupo de testes e tente novamente mais tarde",
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
