import { Component, ViewChild } from "@angular/core";
import { Slides, NavController } from "ionic-angular";

/**
 * Generated class for the NewsShowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "news-show",
  templateUrl: "news-show.html"
})
export class NewsShowComponent {
  @ViewChild(Slides)
  slides: Slides;
  text: string;
  news: { id: number; text: string }[];

  constructor(public navCtrl: NavController) {
    console.log("Hello NewsShowComponent Component");
    this.text = "Hello World";
    this.news = [
      {
        id: 1,
        text: "exemplo"
      },
      {
        id: 1,
        text: "exemplo"
      },
      {
        id: 1,
        text: "exemplo"
      }
    ];
  }

  slideChanged(ev) {
    // console.log(ev);
    // console.log(this.slides.isEnd());
    // console.log();
    if (this.slides._activeIndex == 2) {
      this.slides.lockSwipeToNext(true);
    } else this.slides.lockSwipeToNext(false);
  }

  select(post) {
    this.navCtrl.push(
      "PostDetailPage",
      {},
      {
        animate: true,
        direction: "forward"
      }
    );
  }
}
