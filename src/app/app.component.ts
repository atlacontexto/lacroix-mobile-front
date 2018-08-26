import { HomePage } from "../pages/home/home";
import { Component, ViewChild } from "@angular/core";
import { Platform, Config, Nav, MenuController, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TranslateService } from "@ngx-translate/core";
import { LandingPage } from "../pages/landing/landing";
import { UserBasicInfoPage } from "../pages/user-basic-info/user-basic-info";
import { ProfilesProvider } from "../providers/profiles/profiles";
import { UserProvider } from "../providers/user/user";
import { User } from "./model/user";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  userComp: string;
  @ViewChild(Nav)
  nav: Nav;
  rootPage: any;
  username: any;
  profileSelected: any;
  profiles: any;
  privatePages: Array<{ title: string; component: any; icon: string }>;
  user: User;

  constructor(
    public menu: MenuController,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private config: Config,
    public events: Events,
    public profilesProvider: ProfilesProvider,
    public userProvider: UserProvider
  ) {
    this.userProvider.user.subscribe(user => {
      this.user = user;
      if (user.length !== 0) {
        this.username = this.user.getShortName();
      }
    });
    this.profilesProvider.listProfiles.subscribe(profiles => {
      this.profiles = profiles;
    });
    this.profilesProvider.currentProfile.subscribe(profile => {
      this.profileSelected = profile;
    });
    this.userComp = "UserBasicInfoPage";

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.setRoot();
    });
    this.initTranslate();
  }

  setRoot() {
    this.privatePages = [
      { title: "INÍCIO", component: HomePage, icon: "home" },
      { title: "BOLETIM", component: "ReportPage", icon: "home" },
      { title: "PLANEJAMENTO", component: "PlanningPage", icon: "home" },
      { title: "FREQUÊNCIA", component: "ClassroomPage", icon: "home" },
      { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" }
    ];

    if (localStorage.getItem("token")) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = LandingPage;
    }
  }

  initTranslate() {
    this.translate.setDefaultLang("pt-br");
    this.translate.get(["BACK_BUTTON_TEXT"]).subscribe(values => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });
    this.config.set("tabsHideOnSubPages", true);
  }

  updateList() {
    // console.log(this.profileSelected);
    if (this.profileSelected) {
      // this.events.publish("app:timeline:profile", this.profileSelected);
      this.profilesProvider.currentProfile.next(this.profileSelected);
      // this.profilesProvider.setCurrentProfile(this.profileSelected);
      if (this.profileSelected["profileType"] === "ProfileStudent") {
        this.privatePages = [
          { title: "INÍCIO", component: HomePage, icon: "home" },
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" },
          { title: "TAREFAS", component: "TaskPage", icon: "home" }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileParent") {
        this.privatePages = [
          { title: "INÍCIO", component: HomePage, icon: "home" },
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileProfessor") {
        this.privatePages = [
          { title: "INÍCIO", component: HomePage, icon: "home" },
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "PLANEJAMENTO", component: "PlanningPage", icon: "home" },
          { title: "FREQUÊNCIA", component: "ClassroomPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileSchool") {
        this.privatePages = [
          { title: "INÍCIO", component: HomePage, icon: "home" },
          { title: "TURMAS", component: "ClassroomPage", icon: "home" },
          { title: "AUTORIZAÇÃO", component: "AuthorizationPage", icon: "home" }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileCounty") {
        this.privatePages = [
          { title: "INÍCIO", component: HomePage, icon: "home" },
          { title: "AUTORIZAÇÃO", component: "AuthorizationPage", icon: "home" }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileComunity") {
        this.privatePages = [
          { title: "INÍCIO", component: HomePage, icon: "home" },
          { title: "HISTÓRICO", component: "HomePage", icon: "home" }
        ];
      }
    }
  }

  logout() {
    localStorage.clear();
    this.nav.setRoot(
      "LandingPage",
      {},
      {
        animate: true,
        direction: "back"
      }
    );
  }

  openPage(page) {
    this.nav.push(
      page,
      { profileSelected: this.profileSelected },
      {
        animate: true,
        direction: "forward"
      }
    );
  }
}
