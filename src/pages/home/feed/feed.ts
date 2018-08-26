import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  ModalController
} from "ionic-angular";
import { NewsNewPage } from "./news/news-new/news-new";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { Profile } from "app/model/profile";
import { FeedProvider } from "../../../providers/feed/feed";

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
  private currentProfile: Profile;

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private modalCtrl: ModalController,
    private profilesProvider: ProfilesProvider,
    public feedProvider: FeedProvider
  ) {
    profilesProvider.currentProfile.subscribe(profile => {
      this.currentProfile = profile;
      console.log(this.currentProfile);
    });
    /*  this.events.subscribe("app:timeline:profile", value => {
      console.log(value);
      this.profileType = value.title;
      this.detail = value.detail;
    }) */
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

  newPost() {
    let newPost = this.modalCtrl.create(NewsNewPage, {}, {});
    newPost.present({});
  }

  onInput(event) {}
}
