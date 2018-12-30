import { Component, Input } from "@angular/core";
import { PlanningProvider } from "../../../../providers/planning/planning";
import { NavController } from "ionic-angular";

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
        this.plannings = res;
      })
      .catch(err => {
        console.error(err);
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
