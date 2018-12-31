import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
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
  currentProfile: Profile;
  private _unsubscribeAll: Subject<any>;
  label: String;
  privatePages: { title: string; component: any; icon: string }[];
  profiles: any;
  editing: boolean = false;
  editButton: string = "Reordenar opções";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _profilesProvider: ProfilesProvider,
    public modalCtrl: ModalController
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._profilesProvider.listProfiles.subscribe(profiles => {
      this.profiles = profiles;
      this.updateList();
    });
    this._profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this.currentProfile = profile;
        console.log(this.currentProfile);
        this.updateList();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private changeSelected(): void {
    this._profilesProvider.currentProfile.next(this.currentProfile);
    this.updateList();
  }

  openPage(page) {
    this.navCtrl.push(
      page.component,
      { profileSelected: this.currentProfile },
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  openProfileSelect() {
    let profileSelectModal = this.modalCtrl.create(
      "ProfilesPage",
      { modal: true },
      { showBackdrop: true, enableBackdropDismiss: true }
    );
    profileSelectModal.present();
    profileSelectModal.onDidDismiss(() => {});
  }

  reorderData(ev) {
    this.privatePages = this.reorderArray(this.privatePages, ev);
  }

  reorderArray(array: any[], indexes: { from: number; to: number }): any[] {
    const element = array[indexes.from];
    array.splice(indexes.from, 1);
    array.splice(indexes.to, 0, element);
    return array;
  }

  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.editButton = "Pronto";
    } else {
      this.editButton = "Reordenar opções";
    }
  }

  openHelp() {
    this.navCtrl.push("HelpCenterPage", { source: "Início" });
  }

  private updateList(): void {
    if (this.currentProfile) {
      if (this.currentProfile["profileType"] === "ProfileStudent") {
        this.label = "Perfil";
        this.privatePages = [
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" },
          { title: "TAREFAS", component: "TaskPage", icon: "home" }
        ];
      } else if (this.currentProfile["profileType"] === "ProfileParent") {
        this.label = "Perfil";
        this.privatePages = [
          { title: "BOLETIM", component: "ReportPage", icon: "home" },
          { title: "AVALIAÇÃO", component: "ExamPage", icon: "home" }
        ];
      } else if (this.currentProfile["profileType"] === "ProfileProfessor") {
        this.label = this.currentProfile.$showType;
        this.privatePages = [
          {
            title: "PLANEJAMENTOS",
            component: "PlanningPage",
            icon: "assets/icon/flaticon/education/open-book.svg"
          },
          {
            title: "FREQUÊNCIA",
            component: "ClassroomPage",
            icon: "assets/icon/flaticon/education/exam.svg"
          },
          {
            title: "AVALIAÇÕES",
            component: "ExamPage",
            icon: "assets/icon/flaticon/education/exam-1.svg"
          },
          {
            title: "TURMAS",
            component: "ClassroomDetailPage",
            icon: "assets/icon/flaticon/education/mortarboard.svg"
          },
          {
            title: "AUTORIZAÇÕES",
            component: "AuthorizationPage",
            icon: "assets/icon/flaticon/education/lock.svg"
          }
        ];
      } else if (this.currentProfile["profileType"] === "ProfileSchool") {
        this.label = this.currentProfile.$showType;
        this.privatePages = [
          {
            title: "TURMAS",
            component: "ClassroomListPage",
            icon: "assets/icon/flaticon/education/mortarboard.svg"
          },
          {
            title: "AUTORIZAÇÕES",
            component: "AuthorizationPage",
            icon: "assets/icon/flaticon/education/lock.svg"
          }
        ];
        if (this.currentProfile["role"].type == "pedAdvisor") {
          this.privatePages.push({
            title: "AVALIAÇÕES",
            component: "AssestmentCheckPage",
            icon: "assets/icon/flaticon/education/exam-1.svg"
          });
          this.privatePages.push({
            title: "PLANEJAMENTOS",
            component: "PlanningCheckPage",
            icon: "assets/icon/flaticon/education/open-book.svg"
          });
        }
      } else if (this.currentProfile["profileType"] === "ProfileCounty") {
        this.label = "Perfil";
        this.privatePages = [
          {
            title: "AUTORIZAÇÕES",
            component: "AuthorizationPage",
            icon: "assets/icon/flaticon/education/lock.svg"
          },
          {
            title: "ESCOLAS",
            component: "SchoolsPage",
            icon: "assets/icon/flaticon/education/university.svg"
          },
          {
            title: "PAPÉIS",
            component: "RoleManagementPage",
            icon: "assets/icon/flaticon/education/connection.svg"
          }
        ];
      } else if (this.currentProfile["profileType"] === "ProfileComunity") {
        this.label = "Perfil";
        if (this.currentProfile["role"].type == "voluntary") {
          this.privatePages = [
            {
              title: "DISPONIBILIDADE",
              component: "HomePage",
              icon: "assets/icon/flaticon/education/clock.svg"
            },
            {
              title: "HISTÓRICO",
              component: "HomePage",
              icon: "assets/icon/flaticon/education/exam.svg"
            }
          ];
        } else if (this.currentProfile["role"].type == "representant") {
          this.privatePages = [
            {
              title: "ENGAJAMENTO",
              component: "HomePage",
              icon: "assets/icon/flaticon/education/collaboration.svg"
            }
          ];
        }
      }
    }
  }
}
