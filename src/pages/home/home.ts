import { Component } from "@angular/core";
import { NavController, MenuController } from "ionic-angular";
import { FeedPage } from "./feed/feed";
import { NotificationsPage } from "./notifications/notifications";
import { ChatPage } from "./chat/chat";
import { SchedulePage } from "./schedule/schedule";

@Component({
  selector: "page-home",
  template: `
  <ion-tabs color=light>
    <ion-tab tabIcon="home" tabBadge="3" tabBadgeStyle="danger" tabTitle="Início" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="notifications" tabBadge="3" tabBadgeStyle="danger" tabTitle="Notificações" [root]="tab2"></ion-tab>
    <ion-tab tabIcon="calendar" tabBadge="3" tabBadgeStyle="danger" tabTitle="Calendário" [root]="tab3"></ion-tab>
    <ion-tab tabIcon="chatboxes" tabBadge="3" tabBadgeStyle="danger" tabTitle="Conversa" [root]="tab4"></ion-tab>
  </ion-tabs>`
})
export class HomePage {
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.tab1 = FeedPage;
    this.tab2 = NotificationsPage;
    this.tab3 = SchedulePage;
    this.tab4 = ChatPage;
    this.menuCtrl.enable(true, "authenticated");
  }
}
