import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NotificationsPage } from "./notifications";
import { NoticesComponent } from "./notices/notices";
import { RequestsComponent } from "./requests/requests";

@NgModule({
  declarations: [NotificationsPage, NoticesComponent, RequestsComponent],
  imports: [IonicPageModule.forChild(NotificationsPage)],
  exports: [RequestsComponent]
})
export class NotificationsPageModule {}
