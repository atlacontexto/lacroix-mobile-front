import { Component } from "@angular/core";
import { NavController, ModalController, Events } from "ionic-angular";
import { HomePage } from "../../../pages/home/home";
import { UserServiceProvider } from "../../../providers/user-service/user-service";

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
    public userService: UserServiceProvider
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

  start() {
    this.navCtrl.setRoot(
      HomePage,
      {},
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  openModal(page) {
    let profileModal = this.modalCtrl.create(
      page.component,
      { profile: page },
      { enableBackdropDismiss: true }
    );
    profileModal.onDidDismiss(data => {
      if (data) {
        if (data["profileType"]) {
          this.userService.createProfile(data).then(
            res => {
              console.log(res);
            },
            err => {
              console.error(err);
            }
          );
          this.events.publish("app:userinfoupdated", {
            step: "link",
            statusLink: false
          });
        }
      }
    });
    profileModal.present();
  }

  ngAfterContentInit() {
    if (this.showProfiles) {
      this.userService.getProfiles().then(
        res => {
          if (res["success"]) {
            res.data.profiles.forEach(element => {
              this.showProfiles.push(
                Object.assign(element, {
                  title: element.type,
                  component: "ProfileEditPage",
                  icon: "assets/imgs/placeholder.png"
                })
              );
            });
            this.events.publish("app:profiles", this.showProfiles);
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
}
