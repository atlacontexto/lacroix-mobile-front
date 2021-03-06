import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { NewsNewPage } from "./news/news-new/news-new";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { Profile } from "../../../app/model/profile";
import { FeedProvider } from "../../../providers/feed/feed";
import { NewsModel } from "../../../app/model/newsModel";
import { UserProvider } from "../../../providers/user/user";
import { NewsShowComponent } from "./news/news-show/news-show";

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
  @ViewChild(NewsShowComponent)
  child: NewsShowComponent;
  private currentProfile: Profile;

  private news: Array<NewsModel>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private profilesProvider: ProfilesProvider,
    public feedProvider: FeedProvider,
    public userProvider: UserProvider
  ) {
    this.profilesProvider.currentProfile.subscribe(profile => {
      this.currentProfile = profile;
    });
    this.feedProvider.news.subscribe(posts => {
      this.news = posts;
    });
  }

  newPost() {
    let newPost = this.modalCtrl.create(NewsNewPage, {}, {});
    newPost.present({});
  }

  onInput(event) {}

  isProfile(): boolean {
    return this.currentProfile instanceof Profile;
  }

  ionViewWillLeave() {
    console.log("Feed ionViewWillLeave");
    const a = this.child.unsubscribeAll();
    console.log(a);
  }

  showProfile(profile?: Profile): void {
    if (!profile) {
      this.profilesProvider.showingProfile.next(this.currentProfile);
    } else {
      this.profilesProvider.showingProfile.next(profile);
    }
    this.navCtrl.push("ProfileShowPage");
  }
}
