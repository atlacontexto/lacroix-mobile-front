import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Subject } from "rxjs";
import { ProfilesProvider } from "../../providers/profiles/profiles";
import { Profile } from "../../app/model/profile";
import { filter, takeUntil } from "rxjs/operators";
import { ClassroomsProvider } from "../../providers/classrooms/classrooms";

/**
 * Generated class for the ClassroomListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-classroom-list",
  templateUrl: "classroom-list.html"
})
export class ClassroomListPage implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;
  profile: any;
  classrooms: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    public classroomsProvider: ClassroomsProvider
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        this.profile = profile;
        this.classroomsProvider
          .getClassRoomsBySchoolId(this.profile.school.requested._id)
          .then(res => {
            this.classrooms = res;
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openClassroom(classroom) {
    this.navCtrl.push(
      "ClassroomDetailPage",
      { classroom: classroom },
      { animate: true }
    );
  }
}
