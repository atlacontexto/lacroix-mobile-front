import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AuthorizationPage } from "./authorization";
import { TranslateModule } from "@ngx-translate/core";
import { NotificationsPageModule } from "../../pages/home/notifications/notifications.module";
import { RequestsComponent } from "../../pages/home/notifications/requests/requests";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [AuthorizationPage],
  imports: [
    IonicPageModule.forChild(AuthorizationPage),
    TranslateModule.forChild(),
    NotificationsPageModule,
    ComponentsModule
  ],
  entryComponents: [RequestsComponent]
})
export class AuthorizationPageModule {}
