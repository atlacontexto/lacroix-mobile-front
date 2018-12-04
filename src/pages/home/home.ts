import { Component } from "@angular/core";
import { NavController, MenuController } from "ionic-angular";
import { FeedPage } from "./feed/feed";
import { NotificationsPage } from "./notifications/notifications";
import { ChatPage } from "./chat/chat";
import { SchedulePage } from "./schedule/schedule";
import { AppsPage } from "./apps/apps";

@Component({
  selector: "page-home",
  template: `
    <ion-tabs color="light">
      <ion-tab
        tabIcon="home"
        tabBadgeStyle="danger"
        tabTitle="Início"
        [root]="tab1"
      ></ion-tab>
      <ion-tab
        tabIcon="paper"
        tabBadgeStyle="danger"
        tabTitle="Novidades"
        [root]="tab2"
      ></ion-tab>
      <ion-tab
        tabIcon="notifications"
        tabBadgeStyle="danger"
        tabTitle="Notificações"
        [root]="tab3"
      ></ion-tab>
      <ion-tab
        tabIcon="chatboxes"
        tabBadgeStyle="danger"
        tabTitle="Conversa"
        [root]="tab4"
      ></ion-tab>
      <ion-tab
        tabIcon="calendar"
        tabBadgeStyle="danger"
        tabTitle="Calendário"
        [root]="tab5"
      ></ion-tab>
    </ion-tabs>
  `
})

/* Adicionar tabBadges às opções de navegação da tela principal */
export class HomePage {
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;
  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.tab1 = AppsPage;
    this.tab2 = FeedPage;
    this.tab3 = NotificationsPage;
    this.tab4 = ChatPage;
    this.tab5 = SchedulePage;
    this.menuCtrl.enable(true, "authenticated");
  }
}
