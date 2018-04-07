import { Component, ViewChild } from '@angular/core';
import { Platform, Config, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TranslateService } from '@ngx-translate/core';
import { LandingPage } from '../pages/landing/landing';
import { ExamPage } from '../pages/exam/exam';
import { ReportPage } from '../pages/report/report';
import { PlanningPage } from '../pages/planning/planning';
import { AuthorizationPage } from '../pages/authorization/authorization';
import { ClassroomPage } from '../pages/classroom/classroom';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LandingPage;

  profile: string;
  privatePages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private config: Config
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.profile = 'aluno';
    this.initTranslate();
    this.updateList();
  }

  initTranslate() {
    this.translate.setDefaultLang('pt-br');
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
    this.config.set('tabsHideOnSubPages', true);
  }

  updateList() {
    console.log(this.profile);
    console.log('atualizar lista de aplicações');
    if (this.profile == 'aluno') {
      this.privatePages = [
        { title: 'Início', component: HomePage, icon: 'home' },
        { title: 'Boletim', component: ReportPage, icon: 'home' },
        { title: 'Avaliação', component: ExamPage, icon: 'home' }
      ];
    } else if (this.profile == 'pai') {
      this.privatePages = [
        { title: 'Início', component: HomePage, icon: 'home' },
        { title: 'Boletim', component: ReportPage, icon: 'home' },
        { title: 'Avaliação', component: ExamPage, icon: 'home' }
      ];
    } else if (this.profile == 'professor') {
      this.privatePages = [
        { title: 'Início', component: HomePage, icon: 'home' },
        { title: 'Boletim', component: ReportPage, icon: 'home' },
        { title: 'Planejamento', component: PlanningPage, icon: 'home' },
        { title: 'Turmas', component: ClassroomPage, icon: 'home' },
        { title: 'Avaliação', component: ExamPage, icon: 'home' }
      ];
    } else if (this.profile == 'escola') {
      this.privatePages = [
        { title: 'Início', component: HomePage, icon: 'home' },
        { title: 'Turmas', component: ClassroomPage, icon: 'home' },
        { title: 'Autorização', component: AuthorizationPage, icon: 'home' },
      ];
    } else if (this.profile == 'municipio') {
      this.privatePages = [
        { title: 'Início', component: HomePage, icon: 'home' },
        { title: 'Autorização', component: AuthorizationPage, icon: 'home' },
      ];
    }
  }

  logout() {
    this.nav.setRoot('LandingPage', {}, {
      animate: true,
      direction: 'back'
    })
  }

  openPage(page) {
    this.nav.push(page.component,{},{
      animate: true,
      direction: 'forward'
    })
  }
}

