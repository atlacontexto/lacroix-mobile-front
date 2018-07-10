import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";

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
export class ProfileCreateParentComponent {
  @Output() formParentSubmited = new EventEmitter();
  formParent: FormGroup;
  kinships: any;
  child: any;

  constructor(
    private formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private alertProvider: AlertProvider
  ) {
    this.formParent = this.formBuilder.group({
      kinship: ["", Validators.compose([Validators.required])],
      hasChild: [false],
      childContact: [""],
      childId: [""],
      childs: formBuilder.array([this.addChild()])
    });
  }

  addChild(): any {
    return this.formBuilder.group({
      id: "",
      contact: ""
    });
  }

  ngAfterContentInit() {
    this.kinships = this.profilesProvider.getKinships();
  }

  onInputTime(data) {
    if (data.value) {
      this.alertProvider.presentControlledLoader("Buscando por contato...");
      this.child = this.profilesProvider.getFoundExamples(data.value)[0];
      this.alertProvider.loading.dismiss();
      if (!this.child) {
        this.alertProvider.presentAlert(
          "Usuário não encontrado",
          "Gostaria de enviar um convite? Certifique de que o contato está correto",
          "Ok"
        );
        console.log(this.formParent.value.childContact);
      } else {
        this.formParent.controls["childId"].setValue(this.child.id);
      }
    }
  }
}
