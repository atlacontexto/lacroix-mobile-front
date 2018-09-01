import { Component } from "@angular/core";
import { NavController, ModalController, Events } from "ionic-angular";
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
  item = { title: "", component: "ProfileCreatePage" };
  showProfiles: Array<any>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events,
    public userService: UserProvider
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

  openModal(page) {
    let profileModal = this.modalCtrl.create(
      page.component,
      { profile: page },
      { enableBackdropDismiss: true }
    );
    profileModal.onDidDismiss(() => {
      // if(page.component === "ProfileCreatePage")
      this.updateProfilesListing();
    })
    profileModal.present();
  }

  ngAfterContentInit() {
    if (this.showProfiles) {
      this.updateProfilesListing()
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
    this.showProfiles = new Array();
    this.userService.getProfiles().then(
      res => {
        if (res["success"]) {
          res.data.profiles.forEach(element => {
            let title = "";
            if (element.profileType == "ProfileProfessor") {
              title = "Professor";
            } else if (element.profileType == "ProfileStudent") {
              title = "Aluno";
            } else if (element.profileType == "ProfileParent") {
              title = "Família";
            } else if (element.profileType == "ProfileCounty") {
              title = "Gestão Municipal";
            } else if (element.profileType == "ProfileSchool") {
              title = "Gestão Escolar";
            } else if (element.profileType == "ProfileComunity") {
              title = "Comunidade";
            }
            let main = false;
            if(element._id === res.data.main) {
              main = true
            }
            this.showProfiles.push(
              Object.assign(element, {
                title: title,
                component: "ProfileEditPage",
                icon: "assets/imgs/placeholder.png",
                main
              })
            );
          });
          this.events.publish("app:profiles", this.showProfiles);
          if(this.showProfiles.length) {
            this.events.publish("app:showstart", true);
          } else {
            this.events.publish("app:showstart", false);
          }
        } else {
          console.log(res["message"]);
          this.showHelp = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
