import { HomePage } from "../pages/home/home";
import { Component, ViewChild } from "@angular/core";
import { Platform, Config, Nav, MenuController, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TranslateService } from "@ngx-translate/core";
import { LandingPage } from "../pages/landing/landing";
import { UserBasicInfoPage } from "../pages/user-basic-info/user-basic-info";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  userComp: string;
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  username: any;
  profileSelected: any;
  profiles: any;
  privatePages: Array<{ title: string; component: any; icon: string }>;

  constructor(
    public menu: MenuController,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private config: Config,
    public events: Events
  ) {
    this.userComp = "UserBasicInfoPage";
    if (localStorage.getItem("shortName"))
      this.username = localStorage.getItem("shortName");
    this.events.subscribe("app:profiles", profiles => {
      this.profiles = profiles;
      this.profiles.forEach(element => {
        if (element["main"]) {
          this.profileSelected = element;
        }
      });
      this.updateList();
    });
    this.events.subscribe("app:user", () => {
      this.username = localStorage.getItem("shortName");
    });
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
    if (this.profileSelected) {
      if (this.profileSelected["type"] == "student") {
        this.privatePages = [
          { title: "INÍCIO", component: "HomePage", icon: "home" },
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" }
        ];
      } else if (this.profileSelected["type"] == "parent") {
        this.privatePages = [
          { title: "INÍCIO", component: "HomePage", icon: "home" },
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" }
        ];
      } else if (this.profileSelected["type"] == "professor") {
        this.privatePages = [
          { title: "INÍCIO", component: "HomePage", icon: "home" },
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "PLANEJAMENTO", component: "PlanningPage", icon: "home" },
          { title: "FREQUÊNCIA", component: "ClassroomPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" }
        ];
      } else if (this.profileSelected["type"] == "schoolm") {
        this.privatePages = [
          { title: "INÍCIO", component: "HomePage", icon: "home" },
          { title: "TURMAS", component: "ClassroomPage", icon: "home" },
          { title: "AUTORIZAÇÃO", component: "AuthorizationPage", icon: "home" }
        ];
      } else if (this.profileSelected["type"] == "countym") {
        this.privatePages = [
          { title: "INÍCIO", component: "HomePage", icon: "home" },
          { title: "AUTORIZAÇÃO", component: "AuthorizationPage", icon: "home" }
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
