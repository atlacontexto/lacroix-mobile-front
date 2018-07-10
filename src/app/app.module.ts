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
import { LandingPage } from "../pages/landing/landing";
import { LandingPageModule } from "../pages/landing/landing.module";
import { RegisterPhonePage } from "../pages/register-phone/register-phone";
import { RegisterPhoneCheckPage } from "../pages/register-phone-check/register-phone-check";
import { RegisterPhonePageModule } from "../pages/register-phone/register-phone.module";
import { RegisterPhoneCheckPageModule } from "../pages/register-phone-check/register-phone-check.module";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { UserBasicInfoPageModule } from "../pages/user-basic-info/user-basic-info.module";
import { UserBasicInfoPage } from "../pages/user-basic-info/user-basic-info";
import { UserServiceProvider } from "../providers/user-service/user-service";
import { AlertProvider } from "../providers/alert-service/alert-service";
import { Keyboard } from "@ionic-native/keyboard";
import { ProfileCreatePageModule } from "../pages/profile-create/profile-create.module";
import { ProfileCreatePage } from "../pages/profile-create/profile-create";
import { PostDetailPage } from "../pages/post-detail/post-detail";
import { PostDetailPageModule } from "../pages/post-detail/post-detail.module";
import { PlanningPageModule } from "../pages/planning/planning.module";
import { ReportPageModule } from "../pages/report/report.module";
import { ClassroomPageModule } from "../pages/classroom/classroom.module";
import { PlanningPage } from "../pages/planning/planning";
import { ClassroomPage } from "../pages/classroom/classroom";
import { ReportPage } from "../pages/report/report";
import { ExamPage } from "../pages/exam/exam";
import { ExamPageModule } from "../pages/exam/exam.module";
import { AuthorizationPage } from "../pages/authorization/authorization";
import { AuthorizationPageModule } from "../pages/authorization/authorization.module";

import { NgCalendarModule } from "ionic2-calendar";
import { PlanningListPage } from "../pages/planning-list/planning-list";
import { PlanningListPageModule } from "../pages/planning-list/planning-list.module";
import { NotificationProvider } from "../providers/notification/notification";
import { ClassroomServiceProvider } from "../providers/classroom-service/classroom-service";
import { HomePageModule } from "../pages/home/home.module";

import { ProfilesProvider } from "../providers/profiles/profiles";
import { GeoProvider } from "../providers/geo/geo";

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
    HomePageModule,
    LandingPageModule,
    RegisterPhonePageModule,
    RegisterPhoneCheckPageModule,
    UserBasicInfoPageModule,
    ProfileCreatePageModule,
    PostDetailPageModule,
    PlanningPageModule,
    ReportPageModule,
    ClassroomPageModule,
    ExamPageModule,
    AuthorizationPageModule,
    PlanningListPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    RegisterPhonePage,
    RegisterPhoneCheckPage,
    UserBasicInfoPage,
    ProfileCreatePage,
    PostDetailPage,
    PlanningPage,
    ClassroomPage,
    ReportPage,
    ExamPage,
    AuthorizationPage,
    PlanningListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    UserServiceProvider,
    AlertProvider,
    Keyboard,
    NotificationProvider,
    ClassroomServiceProvider,
    ProfilesProvider,
    GeoProvider
  ]
})
export class AppModule {}
