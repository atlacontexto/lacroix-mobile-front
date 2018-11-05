import { Component, Input } from "@angular/core";
import { PlanningProvider } from "../../../../providers/planning/planning";
import { AlertController, NavController } from "ionic-angular";

/**
 * Generated class for the PlanningListDailyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "planning-list-daily",
  templateUrl: "planning-list-daily.html"
})
export class PlanningListDailyComponent {
  @Input()
  title: string;
  @Input()
  id: string;
  text: string;
  plannings: {};

  constructor(
    public planningProvider: PlanningProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    console.log("Hello PlanningListDailyComponent Component");
    this.text = "Hello World";
  }

  ngOnInit(): void {
    console.log(this.id);
    this.planningProvider
      .getDailyPlanningByTheme(this.title, this.id)
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
