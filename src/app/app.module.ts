import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { LandingPage } from '../pages/landing/landing';
import { LandingPageModule } from '../pages/landing/landing.module';
import { RegisterPhonePage } from '../pages/register-phone/register-phone';
import { RegisterPhoneCheckPage } from '../pages/register-phone-check/register-phone-check';
import { RegisterPhonePageModule } from '../pages/register-phone/register-phone.module';
import { RegisterPhoneCheckPageModule } from '../pages/register-phone-check/register-phone-check.module';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserBasicInfoPageModule } from '../pages/user-basic-info/user-basic-info.module';
import { UserBasicInfoPage } from '../pages/user-basic-info/user-basic-info';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { Keyboard } from '@ionic-native/keyboard';
import { ProfileCreatePageModule } from '../pages/profile-create/profile-create.module';
import { ProfileCreatePage } from '../pages/profile-create/profile-create';
import { FeedPage } from '../pages/feed/feed';
import { NotificationsPage } from '../pages/notifications/notifications';
import { SchedulePage } from '../pages/schedule/schedule';
import { ChatPage } from '../pages/chat/chat';
import { FeedPageModule } from '../pages/feed/feed.module';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';
import { SchedulePageModule } from '../pages/schedule/schedule.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { ChatShowPage } from '../pages/chat-show/chat-show';
import { ChatShowPageModule } from '../pages/chat-show/chat-show.module';
import { PostDetailPage } from '../pages/post-detail/post-detail';
import { PostDetailPageModule } from '../pages/post-detail/post-detail.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LandingPageModule,
    RegisterPhonePageModule,
    RegisterPhoneCheckPageModule,
    UserBasicInfoPageModule,
    ProfileCreatePageModule,
    FeedPageModule,
    NotificationsPageModule,
    SchedulePageModule,
    ChatPageModule,
    ChatShowPageModule,
    PostDetailPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    RegisterPhonePage,
    RegisterPhoneCheckPage,
    UserBasicInfoPage,
    ProfileCreatePage,
    FeedPage,
    NotificationsPage,
    SchedulePage,
    ChatPage,
    ChatShowPage,
    PostDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UserServiceProvider,
    AlertServiceProvider,
    Keyboard,
  ]
})
export class AppModule {}
