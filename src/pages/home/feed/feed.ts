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
import { Profile } from "../../../app/model/profile";
import { FeedProvider } from "../../../providers/feed/feed";
import { NewsModel } from "../../../app/model/newsModel";
import { UserProvider } from "../../../providers/user/user";

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
  postFake = {
    creator: "Savio",
    avatar: "assets/imgs/placeholder.png",
    message: "Este é o primeiro post da Atla",
    date: "1 abril, 2018",
    countLikes: "14 likes",
    countComments: "36 comentários",
    timeAgo: "1h"
  };
  private news: Array<NewsModel>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private modalCtrl: ModalController,
    private profilesProvider: ProfilesProvider,
    public feedProvider: FeedProvider,
    public userProvider: UserProvider
  ) {
    this.profilesProvider.currentProfile.subscribe(profile => {
      this.currentProfile = profile;
      console.log(this.currentProfile);
    });
    this.feedProvider.news.subscribe(posts => {
      this.news = posts;
      console.log(this.news);
    });
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

  isProfile(): boolean {
    return this.currentProfile instanceof Profile;
  }

  showProfile(profile?: Profile): void {
    console.log(profile);
    if (!profile) {
      this.navCtrl.push("ProfileShowPage", {
        profile: { ...this.currentProfile },
        user: { ...this.userProvider.user.value }
      });
    } else {
      this.navCtrl.push("ProfileShowPage", profile);
    }
  }
}
