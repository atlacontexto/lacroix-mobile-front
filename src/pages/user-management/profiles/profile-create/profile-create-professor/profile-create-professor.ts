import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { GeoProvider } from "../../../../../providers/geo/geo";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { SubjectsProvider } from "../../../../../providers/subjects/subjects";
import { UserProvider } from "../../../../../providers/user/user";

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
export class ProfileCreateProfessorComponent {
  formProfessor: FormGroup;
  @Output()
  formProfessorSubmited = new EventEmitter();
  levels: any;
  years: any;
  schools: any;
  states: any;
  counties: any;
  subjects: any;

  constructor(
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private geoProvider: GeoProvider,
    private alertProvider: AlertProvider,
    private userService: UserProvider,
    private subjectsProvider: SubjectsProvider
  ) {
    this.formProfessor = this.formBuilder.group({
      user: [this.userService.getUserAtt("_id")],
      level: [null, Validators.compose([Validators.required])],
      serie: [null],
      hasSchool: [false],
      schools: [null],
      subjects: [null]
    });
  }

  ngAfterContentInit() {
    this.states = this.geoProvider.getStates();
    this.levels = this.profilesProvider.getCourseLevels();
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

  levelChanged(ev) {
    if (ev == "f1") {
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
    if (this.formProfessor.valid) {
      this.profilesProvider
        .createProfile("professor", this.formProfessor.value)
        .then(res => {
          console.log(res);
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
        });
    }
  }
}
