import { Component, OnInit, OnDestroy } from "@angular/core";
import { FeedProvider } from "../../../../../providers/feed/feed";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";

/**
 * Generated class for the NewsShowOneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "news-show-one",
  templateUrl: "news-show-one.html"
})
export class NewsShowOneComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  post: any;

  constructor(private _feedProvider: FeedProvider) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._feedProvider._currentPost
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(post => typeof post === "object")
      )
      .subscribe(post => {
        this.post = post;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
