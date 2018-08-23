import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-feed",
  templateUrl: "feed.html"
})
export class FeedPage {

  private profileType = "";
  private detail = "";

  private posts: Array<{
    creator: string;
    avatar?: string;
    image?: string;
    message: string;
    date: string;
    countLikes: string;
    countComments: string;
    timeAgo: string;
  }>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.events.subscribe("app:timeline:profile", value => {
      this.profileType = value.profileType;
      this.detail = value.detail;
    })
    this.posts = [
      {
        creator: "Savio",
        avatar: "assets/imgs/placeholder.png",
        message: "Este é o primeiro post da Atla",
        date: "1 abril, 2018",
        countLikes: "14 likes",
        countComments: "36 comentários",
        timeAgo: "1h"
      },
      {
        creator: "Savio",
        avatar: "assets/imgs/placeholder.png",
        message: "Este é o primeiro post da Atla",
        date: "1 abril, 2018",
        countLikes: "14 likes",
        countComments: "36 comentários",
        timeAgo: "1h"
      },
      {
        creator: "Savio",
        avatar: "assets/imgs/placeholder.png",
        message: "Este é o primeiro post da Atla",
        date: "1 abril, 2018",
        countLikes: "14 likes",
        countComments: "36 comentários",
        timeAgo: "1h"
      },
      {
        creator: "Savio",
        avatar: "assets/imgs/placeholder.png",
        message: "Este é o primeiro post da Atla",
        date: "1 abril, 2018",
        countLikes: "14 likes",
        countComments: "36 comentários",
        timeAgo: "1h"
      }
    ];
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

  onInput(event) {}
}
