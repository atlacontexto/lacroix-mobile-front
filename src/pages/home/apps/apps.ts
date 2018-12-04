import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { Profile } from "../../../app/model/profile";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";

/**
 * Generated class for the AppsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-apps",
  templateUrl: "apps.html"
})
export class AppsPage implements OnInit, OnDestroy {
  profileSelected: Profile;
  private _unsubscribeAll: Subject<any>;
  label: string;
  privatePages: { title: string; component: any; icon: string }[];
  profiles: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.profilesProvider.listProfiles.subscribe(profiles => {
      this.profiles = profiles;
      this.updateList();
    });
    this.profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this.profileSelected = profile;
        this.updateList();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private changeSelected(): void {
    this.profilesProvider.currentProfile.next(this.profileSelected);
    this.updateList();
  }

  openPage(page) {
    this.navCtrl.push(
      page,
      { profileSelected: this.profileSelected },
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  private updateList(): void {
    if (this.profileSelected) {
      if (this.profileSelected["profileType"] === "ProfileStudent") {
        this.label = "Perfil";
        this.privatePages = [
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" },
          { title: "TAREFAS", component: "TaskPage", icon: "home" }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileParent") {
        this.label = "Perfil";
        this.privatePages = [
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileProfessor") {
        this.label = this.profileSelected.$showType;
        this.privatePages = [
          {
            title: "BOLETIM",
            component: "ReportPage",
            icon: "assets/icon/flaticon/education/diploma.svg"
          },
          {
            title: "PLANEJAMENTO",
            component: "PlanningPage",
            icon: "assets/icon/flaticon/education/open-book.svg"
          },
          { title: "FREQUÊNCIA", component: "ClassroomPage", icon: "home" },
          {
            title: "AVALIAÇÃO",
            component: "ExamPage",
            icon: "assets/icon/flaticon/education/exam.svg"
          },
          {
            title: "TURMA",
            component: "ClassroomDetailPage",
            icon: "assets/icon/flaticon/education/mortarboard.svg"
          },
          {
            title: "AUTORIZAÇÃO",
            component: "AuthorizationPage",
            icon: "assets/icon/flaticon/education/lock.svg"
          }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileSchool") {
        this.label = this.profileSelected.$showType;
        this.privatePages = [
          { title: "TURMAS", component: "ClassroomListPage", icon: "home" },
          {
            title: "AUTORIZAÇÃO",
            component: "AuthorizationPage",
            icon: "assets/icon/flaticon/education/lock.svg"
          }
        ];
        if (this.profileSelected["role"].type == "pedAdvisor") {
          this.privatePages.push({
            title: "AVALIAÇÕES",
            component: "AssestmentCheckPage",
            icon: "home"
          });
          this.privatePages.push({
            title: "PLANO DIÁRIO",
            component: "PlanningCheckPage",
            icon: "home"
          });
        }
      } else if (this.profileSelected["profileType"] === "ProfileCounty") {
        this.label = "Perfil";
        this.privatePages = [
          {
            title: "AUTORIZAÇÃO",
            component: "AuthorizationPage",
            icon: "home"
          },
          {
            title: "ESCOLAS",
            component: "SchoolsPage",
            icon: "assets/icon/flaticon/education/university.svg"
          },
          { title: "PAPÉIS", component: "RolesPage", icon: "home" },
          { title: "PERMISSÕES", component: "PermissionsPage", icon: "home" }
        ];
      } else if (this.profileSelected["profileType"] === "ProfileComunity") {
        this.privatePages = [
          { title: "HISTÓRICO", component: "HomePage", icon: "home" }
        ];
      }
    }
  }
}
