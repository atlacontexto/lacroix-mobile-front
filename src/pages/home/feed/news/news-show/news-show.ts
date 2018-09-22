import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Slides, NavController } from "ionic-angular";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { takeUntil, filter } from "rxjs/operators";
import { Profile } from "../../../../../app/model/profile";
import { Subject } from "rxjs";
import { FeedProvider } from "../../../../../providers/feed/feed";

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
export class NewsShowComponent implements OnInit, OnDestroy {
  @ViewChild(Slides)
  slides: Slides;
  text: string;
  news: { id: number; text: string }[];
  profile: Profile;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public navCtrl: NavController,
    private _profilesProvider: ProfilesProvider,
    private _feedProvider: FeedProvider
  ) {
    this._unsubscribeAll = new Subject();
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

  ngOnInit(): void {
    console.log("Showing News Opened");
    this._profilesProvider.showingProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        this.profile = profile;
        this.getNews(this.profile.id, 1, 10);
      });
  }

  getNews(id: string, arg1: number, arg2: number): any {
    this._feedProvider
      .getPostsByProfile(this.profile.id)
      .then(res => {
        console.log(res);
        this.news = res.news;
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    console.log("Showing News Closed");
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    "News Show unsubscribed";
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
    this._feedProvider._currentPost.next(post);
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
