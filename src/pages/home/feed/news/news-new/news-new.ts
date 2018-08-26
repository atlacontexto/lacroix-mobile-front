import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { FeedProvider } from "../../../../../providers/feed/feed";

/**
 * Generated class for the NewsNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-news-new",
  templateUrl: "news-new.html"
})
export class NewsNewPage {
  @ViewChild("myInput")
  myInput: ElementRef;
  private newsContent: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public feedProvider: FeedProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad NewsNewPage");
  }

  resize() {
    var element = this.myInput[
      "_elementRef"
    ].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + "px";
    this.myInput["_elementRef"].nativeElement.style.height =
      scrollHeight + 16 + "px";
  }

  dismiss() {
    console.log(this.newsContent);
    this.feedProvider
      .postNews(this.newsContent)
      .then(res => {console.log(res)})
      .catch(err => {
        console.log(err);
      });
    this.viewCtrl.dismiss();
  }
}
