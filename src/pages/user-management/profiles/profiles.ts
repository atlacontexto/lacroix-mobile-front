import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  Events,
  LoadingController
} from "ionic-angular";
import { HomePage } from "../../../pages/home/home";
import { UserProvider } from "../../../providers/user/user";

/**
 * Generated class for the ProfilesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export interface Slide {
  title: string;
  description: string;
}

@Component({
  selector: "profiles",
  templateUrl: "profiles.html"
})
export class ProfilesComponent {
  slides: Slide[];
  showHelp = false;
  showProfiles: Array<any>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController
  ) {
    this.showProfiles = new Array();
  }

  showHelpAction() {
    if (this.showHelp) {
      this.showHelp = false;
    } else {
      this.showHelp = true;
    }
  }

  createProfile() {
    let profileModal = this.modalCtrl.create("ProfileCreatePage", {
      enableBackdropDismiss: true
    });
    profileModal.onDidDismiss(() => {
      this.updateProfilesListing();
    });
    profileModal.present();
  }

  editProfile(profile) {
    console.log(profile);
    let profileModal = this.modalCtrl.create(
      "ProfileEditPage",
      { profile: profile },
      { enableBackdropDismiss: true }
    );
    profileModal.onDidDismiss(() => {
      // if(page.component === "ProfileCreatePage")
      this.updateProfilesListing();
    });
    profileModal.present();
  }

  ngAfterContentInit() {
    if (this.showProfiles) {
      this.updateProfilesListing();
    }
    if (!this.slides) {
      this.slides = [
        {
          title: "Perfil para Alunos",
          description: "Texto explicativo do uso de perfis para Alunos"
        },
        {
          title: "Perfil para Responsáveis",
          description:
            "Texto explicativo do uso de perfis para Pais e Responsáveis"
        },
        {
          title: "Perfil para Professores",
          description: "Texto explicativo do uso de perfis para Professores"
        },
        {
          title: "Perfil para Gestão Escolar",
          description: "Texto explicativo do uso de perfis para Gestão Escolar"
        },
        {
          title: "Perfil para Administração Municipal",
          description:
            "Texto explicativo do uso de perfis para Gestão Municipal"
        }
      ];
    }
  }

  updateProfilesListing() {
    let getLoading = this.loadingCtrl.create({
      content: "Buscando perfis..."
    });
    getLoading.present();
    this.showProfiles = new Array();
    this.userProvider.getProfiles().then(
      profiles => {
        if (profiles) {
          console.log(profiles);
          this.showProfiles = profiles;
        } else {
          this.showHelp = true;
        }
      },
      err => {
        this.showHelp = true;
        console.log(err);
      }
    );
    getLoading.dismiss();
  }
}
