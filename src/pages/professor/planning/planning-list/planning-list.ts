import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { PlanningProvider } from "../../../../providers/planning/planning";

/**
 * Generated class for the PlanningListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-planning-list",
  templateUrl: "planning-list.html"
})
export class PlanningListPage implements OnInit, OnDestroy {
  title: string;
  ptds: Array<{ type: string; title: string }>;
  plannings: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public planningProvider: PlanningProvider,
    public alertCtrl: AlertController
  ) {
    this.title = navParams.get("title");
  }

  ionViewWillEnter() {
    this.ptds = [
      { type: "ptd", title: "1º BIMESTRE" },
      { type: "ptd", title: "2º BIMESTRE" },
      { type: "ptd", title: "3º BIMESTRE" },
      { type: "ptd", title: "4º BIMESTRE" }
    ];
  }

  ngOnInit(): void {
    this.planningProvider
      .getDailyPlanningByTheme(this.title["value"])
      .then(res => {
        console.log(res);
        this.plannings = res;
      })
      .catch(err => {
        let getPlanningError = this.alertCtrl.create({
          title: "Erro na recuperação dos planos",
          message:
            "Ocorreu uma falha interna na recuperação dos seus planos diários. Tente novamente mais tarde.",
          buttons: ["OK"]
        });
        getPlanningError.present();
      });
  }
  ngOnDestroy(): void {}

  open(planning?) {
    this.navCtrl.push(
      "PlanningDetailPage",
      { planning: planning },
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  openDaily(planning) {
    this.navCtrl.push(
      "PlanningDailyPage",
      { planning: planning },
      {
        animate: true,
        direction: "forward"
      }
    );
  }
}
