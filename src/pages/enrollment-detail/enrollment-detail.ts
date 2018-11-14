import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the EnrollmentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-enrollment-detail",
  templateUrl: "enrollment-detail.html"
})
export class EnrollmentDetailPage {
  student: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = this.navParams.get("student");
    console.log(this.student);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EnrollmentDetailPage");
  }
}
