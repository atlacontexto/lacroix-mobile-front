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
  FormArray,
  FormControl
} from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { ModalController } from "ionic-angular";
import { UserProvider } from "../../../../../providers/user/user";
import { ProfileCreatePage } from "../profile-create";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { User } from "../../../../../app/model/user";
import { Profile } from "../../../../../app/model/profile";

/**
 * Generated class for the ProfileCreateParentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-create-parent",
  templateUrl: "profile-create-parent.html"
})
export class ProfileCreateParentComponent implements OnDestroy, OnInit {
  @Output()
  formParentSubmited = new EventEmitter();
  kinships: any;
  child: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(ProfileCreatePage) private parentPage: ProfileCreatePage,
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private alertProvider: AlertProvider,
    private userService: UserProvider,
    private modalCtrl: ModalController
  ) {
    this._unsubscribeAll = new Subject();
    this.parentPage.form.addControl("user", new FormControl());
    this.parentPage.form.addControl("kinship", new FormControl());
    this.parentPage.form.addControl(
      "hasChilds",
      new FormControl(false, Validators.compose([Validators.required]))
    );
    this.parentPage.form.addControl("childId", new FormControl(null));
    this.parentPage.form.addControl("childContact", new FormControl(null));
  }

  ngOnInit(): void {
    console.log("OnInit Create Parent");
    this.userService.user
      .pipe(
        filter(user => user instanceof User),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(user => {
        this.parentPage.form.controls["user"].setValue(user.id);
      });
    this.kinships = this.profilesProvider.getKinships();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onInputTime(data) {
    if (data.value) {
      this.alertProvider.presentControlledLoader("Buscando por contato...");
      // this.child = this.profilesProvider.getFoundExamplesFake(data.value)[0];

      this.profilesProvider
        .getProfileByContact("student", data.value)
        .then(res => {
          this.child = res;
          console.log(this.child);
          this.parentPage.form.controls["childId"].setValue(
            this.child.profile._id
          );
          this.alertProvider.loading.dismiss();
        })
        .catch(err => {
          console.error(err);
          this.alertProvider.loading.dismiss();
          if (!this.child) {
            this.alertProvider.presentAlert(
              "Usuário não encontrado",
              "Gostaria de enviar um convite? Certifique de que o contato está correto",
              "Ok"
            );
          } else {
            this.parentPage.form.controls["childId"].setValue(this.child.id);
          }
        });
    }
  }

  onSubmit() {
    console.log(this.parentPage.form.value);
    if (this.parentPage.form.valid) {
      this.profilesProvider
        .createProfile("parent", this.parentPage.form.value)
        .then(res => {
          console.log(res);
          if (res["success"]) {
            this.alertProvider.presentAlert(
              "Perfil Familiar criado",
              "Agora será possível acompanhar o histórico escolar dos seus filhos",
              "Ok"
            );
            this.formParentSubmited.emit();
          }
        })
        .catch(err => {
          console.log(err);
          this.alertProvider.presentAlert(
            "Erro ao criar Perfil Familiar",
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

  viewProfile(profileId) {
    this.profilesProvider.showingProfile.next(
      Object.assign(new Profile(), this.child.profile)
    );
    const profileModal = this.modalCtrl.create("ProfileShowPage", {
      profileId: profileId,
      name: this.child.name,
      shortName: this.child.shortName
    });
    profileModal.present();
  }
}
