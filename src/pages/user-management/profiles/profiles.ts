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
          description:
            "ATLA Ensino para alunos permite o acesso do aluno ao cronograma de atividades, notas, frequência e outras notas de aula enviadas por professores e colegas."
        },
        {
          title: "Perfil para Familiares e Responsáveis",
          description:
            "ATLA Ensino para família, é o recurso ideal para acompanhamento do cronograma de atividades, notas, convocações e reuniões de interesse do grupo familiar sobre o desempenho dos seus dependentes."
        },
        {
          title: "Perfil para Professores",
          description:
            "Com ATLA Ensino, os professores tem uma nova oportunidade de associarem a tecnologia para realização das tarefas cotidianas, como a criação de planos de aula e avaliações."
        },
        {
          title: "Perfil para Funcionário da Gestão Escolar",
          description:
            "Uma gestão escolar mais forte é construída a partir da aproximação de todos os personagens envolvidos, explorando o que as tecnologias da comunicação têm a oferecer, na construção de um ambiente integrado, entre alunos, pais e professores."
        },
        {
          title: "Perfil para Funcionário da Gestão Educacional do Município",
          description:
            "Os resultados de uma educação nivelada, que reflitam os esforços empregados na melhoria da educação municipal serão viabilizados com a adoção de métodos de análise de desempenho e auditoria dos colaboradores da educação."
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
