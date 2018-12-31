import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as JWT from "jwt-decode";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { Profile } from "../../../app/model/profile";
import { ChatProvider } from "../../../providers/chat/chat";
import { ProfileSchoolInstitutional } from "../../../app/model/profile-school-institutional";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/*
  - Professor:
    - Prioridade: professores mesma escola
    - Secundário: equipe de gestão
    -------
    - Terciário: rede de ensino e professores de outras escolas
  
  - Gestão escolar:
    - Prioridade:  equipe de gestão
    - Secundário: professores da rede
 */
@IonicPage()
@Component({
  selector: "page-chat",
  templateUrl: "chat.html"
})
export class ChatPage {
  items = [
    {
      name: "Eliana Meneses",
      avatar: "assets/imgs/placeholder.png",
      lastMessage: "Vou procurar uma mesa",
      lastMessageTime: "1:12 pm"
    },
    {
      name: "Tânia",
      avatar: "assets/imgs/placeholder.png",
      lastMessage: "Falei seu nome na rádio",
      lastMessageTime: "1:12 pm"
    },
    {
      name: "Ana Kaffa",
      avatar: "assets/imgs/placeholder.png",
      lastMessage: "Tem como integrar a BNCC?",
      lastMessageTime: "1:12 pm"
    },
    {
      name: "Gisele Florentim",
      avatar: "assets/imgs/placeholder.png",
      lastMessage: "E o módulo administrativo?",
      lastMessageTime: "1:12 pm"
    }
  ];

  private priorityProfileText: string;
  private secondaryProfileText: string;

  private priorityProfiles: Profile[];
  private secondaryProfiles: Profile[];

  private currentProfile: Profile;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public chatProvider: ChatProvider
  ) {}

  ionViewDidLoad() {
    this.profilesProvider.currentProfile.subscribe(profile => {
      this.currentProfile = profile;

      this.priorityProfileText =
        this.currentProfile.$profileType === "ProfileSchool"
          ? "Equipe gestão"
          : this.currentProfile.$profileType === "ProfileProfessor"
          ? "Professores colegas"
          : "";

      this.secondaryProfileText =
        this.currentProfile.$profileType === "ProfileSchool"
          ? "Professores"
          : this.currentProfile.$profileType === "ProfileProfessor"
          ? "Gestores"
          : "";

      const school = this.currentProfile["school"]["requested"]["_id"];

      if (this.currentProfile.$profileType === "ProfileSchool") {
        this.chatProvider.getSchoolManagers(school).then((data: Profile[]) => {
          this.priorityProfiles = data
            .map(profile => profile["requesting"]["user"]["people"])
            .filter(profile => this.currentProfile["user"] !== profile.user);
        });

        this.chatProvider
          .getProfessorsOfSameSchool(school)
          .then((data: Profile[]) => {
            this.secondaryProfiles = data.map(
              profile => profile["user"]["people"]
            );
          });
      } else if (this.currentProfile.$profileType === "ProfileProfessor") {
        this.chatProvider
          .getProfessorsOfSameSchool(school)
          .then((data: Profile[]) => {
            this.priorityProfiles = data
              .filter(
                profile =>
                  this.currentProfile["user"] !== profile["user"]["_id"]
              )
              .map(profile => profile["user"]["people"]);
          });

        this.chatProvider.getSchoolManagers(school).then((data: Profile[]) => {
          this.secondaryProfiles = data.map(
            profile => profile["requesting"]["user"]["people"]
          );
        });
      }
    });
  }

  itemSelected(item: string) {
    this.navCtrl.push(
      "ChatShowPage",
      { item },
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  onInput(event) {}

  openOthers() {
    this.navCtrl.push("ChatOthersPage");
  }
}
