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
import { UserProvider } from "../providers/user/user";
import { AlertProvider } from "../providers/alert-service/alert-service";
import { Keyboard } from "@ionic-native/keyboard";
import { PostDetailPage } from "../pages/post-detail/post-detail";
import { PostDetailPageModule } from "../pages/post-detail/post-detail.module";
import { ReportPageModule } from "../pages/report/report.module";
import { ReportPage } from "../pages/report/report";
import { ExamPage } from "../pages/exam/exam";
import { ExamPageModule } from "../pages/exam/exam.module";
import { AuthorizationPage } from "../pages/authorization/authorization";
import { AuthorizationPageModule } from "../pages/authorization/authorization.module";

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
import { UserManagementModule } from "../pages/user-management/user-management.module";
import { ProfileEditPageModule } from "../pages/user-management/profiles/profile-edit/profile-edit.module";
import { ProfileEditPage } from "../pages/user-management/profiles/profile-edit/profile-edit";
import { PlanningListPageModule } from "../pages/professor/planning-list/planning-list.module";
import { ClassroomPageModule } from "../pages/professor/classroom/classroom.module";
import { PlanningPageModule } from "../pages/professor/planning/planning.module";
import { RegisterPhonePageModule } from "../pages/authentication/register-phone/register-phone.module";
import { RegisterPhoneCheckPageModule } from "../pages/authentication/register-phone-check/register-phone-check.module";

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
    UserManagementModule,
    PostDetailPageModule,
    PlanningPageModule,
    ReportPageModule,
    ClassroomPageModule,
    ExamPageModule,
    AuthorizationPageModule,
    PlanningListPageModule,
    ProfileEditPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    PostDetailPage,
    ReportPage,
    ExamPage,
    AuthorizationPage
  ],
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
    FeedProvider
  ]
})
export class AppModule {}
