import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ClassroomServiceProvider } from "../../../providers/classroom-service/classroom-service";

/**
 * Generated class for the DailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-daily",
  templateUrl: "daily.html"
})
export class DailyPage {
  professorId: string;
  enrollments: Array<{ name: string; gender: string; avatar: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public classroomService: ClassroomServiceProvider
  ) {
    this.enrollments = new Array();
    this.professorId = this.navParams.get("professorId");
    this.getEnrollments();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DailyPage");
  }

  getEnrollments() {
    this.classroomService
      .getEnrollments(this.professorId)
      .then(result => {
        result["enrollments"].forEach(element => {
          console.log(element["enrollment"]["student"]);
          this.enrollments.push({
            name: element["enrollment"]["student"]["name"],
            gender: element["enrollment"]["student"]["gender"],
            avatar: "assets/imgs/placeholder.png"
          });
        });
        console.log(this.enrollments);
        this;
      })
      .catch(err => {
        console.error(err);
      });
  }

  saveDaily() {}
}
