import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { MyApp } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { UserProvider } from "../providers/user/user";
import { AlertProvider } from "../providers/alert-service/alert-service";
import { Keyboard } from "@ionic-native/keyboard";

import { NgCalendarModule } from "ionic2-calendar";
import { NotificationProvider } from "../providers/notification/notification";
import { ClassroomServiceProvider } from "../providers/classroom-service/classroom-service";
import { HomePageModule } from "../pages/home/home.module";

import { ProfilesProvider } from "../providers/profiles/profiles";
import { GeoProvider } from "../providers/geo/geo";
import { SubjectsProvider } from "../providers/subjects/subjects";
import { HomePage } from "../pages/home/home";
import { FeedProvider } from "../providers/feed/feed";
import { AuthProvider } from "../providers/auth/auth";
import { PlanningProvider } from "../providers/planning/planning";
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";
import { AddressProvider } from "../providers/address/address";
import { PersonalProvider } from "../providers/personal/personal";
import { ClassroomsProvider } from "../providers/classrooms/classrooms";
import { Network } from "@ionic-native/network";
import { NetworkProvider } from "../providers/network/network";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SchoolYearProvider } from '../providers/school-year/school-year';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgCalendarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    UserProvider,
    AlertProvider,
    Keyboard,
    NotificationProvider,
    ClassroomServiceProvider,
    ProfilesProvider,
    GeoProvider,
    SubjectsProvider,
    FeedProvider,
    PlanningProvider,
    File,
    FileOpener,
    AddressProvider,
    PersonalProvider,
    ClassroomsProvider,
    Network,
    NetworkProvider,
    InAppBrowser,
    SchoolYearProvider
  ]
})
export class AppModule {}
