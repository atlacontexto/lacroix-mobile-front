import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  IonicPage,
  ModalController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import profiles from "../../../../fakedb/profiles";
import { Profile } from "../../../../app/model/profile";
import { ProfilesProvider } from "../../../../providers/profiles/profiles";

/**
 * Generated class for the ProfileCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-profile-create",
  templateUrl: "profile-create.html"
})
export class ProfileCreatePage {
  @ViewChild("myInput")
  myInput: ElementRef;

  profileType: string;
  form: FormGroup;
  formParent: FormGroup;
  formProfessor: FormGroup;
  themes: Array<{ title: string; checked: boolean; formControl: string }>;
  level: string;
  comunityRole: string;
  profiles: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    private profilesProvider: ProfilesProvider,
    private modalCtrl: ModalController
  ) {
    this.form = this.formBuilder.group({
      bio: [null]
    });
    this.themes = [
      { title: "Arte", checked: false, formControl: "arte" },
      { title: "Ciências", checked: false, formControl: "ciencias" },
      { title: "Educação Física", checked: false, formControl: "edfisica" },
      { title: "Filosofia", checked: false, formControl: "filosofia" },
      { title: "Geografia", checked: false, formControl: "geografia" },
      { title: "História", checked: false, formControl: "historia" },
      {
        title: "Língua Portuguesa",
        checked: false,
        formControl: "lportuguesa"
      },
      { title: "Matemática", checked: false, formControl: "matematica" }
    ];
  }

  ionViewWillEnter() {
    this.profiles = profiles.profileTypes;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  resize() {
    var element = this.myInput[
      "_elementRef"
    ].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + "px";
    this.myInput["_elementRef"].nativeElement.style.height =
      scrollHeight + 16 + "px";
  }

  viewProfile(profileId: any, user: any): any {
    this.profilesProvider.showingProfile.next(
      Object.assign(new Profile(), user["profile"])
    );
    const profileModal = this.modalCtrl.create("ProfileShowPage", {
      profileId: profileId,
      name: user["name"],
      shortName: user["shortName"]
    });
    profileModal.present();
  }
}
