import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { ProfilesProvider } from "../../providers/profiles/profiles";
import { takeUntil, filter } from "rxjs/operators";
import { Profile } from "../../app/model/profile";

/**
 * Generated class for the ProfileStatusHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "profile-status-header",
  templateUrl: "profile-status-header.html"
})
export class ProfileStatusHeaderComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  profile: any;

  constructor(public _profilesProvider: ProfilesProvider) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
