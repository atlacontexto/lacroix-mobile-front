import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { FeedPageModule } from "./feed/feed.module";
import { NotificationsPageModule } from "./notifications/notifications.module";
import { SchedulePageModule } from "./schedule/schedule.module";
import { ChatPageModule } from "./chat/chat.module";
import { ChatShowPageModule } from "./chat-show/chat-show.module";

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage),
    FeedPageModule,
    NotificationsPageModule,
    SchedulePageModule,
    ChatPageModule,
    ChatShowPageModule
  ]
})
export class HomePageModule {}
