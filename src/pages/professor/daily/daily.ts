import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ClassroomServiceProvider } from "../../../providers/classroom-service/classroom-service";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Profile } from "../../../app/model/profile";
import { ClassroomsProvider } from "../../../providers/classrooms/classrooms";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

/**
 * Generated class for the DailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-daily",
  templateUrl: "daily.html"
})
export class DailyPage implements OnInit, OnDestroy {
  professorId: string;

  private _unsubscribeAll: Subject<any>;
  profile: any;
  classroom: any;
  students: any;
  frequency: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public classroomService: ClassroomServiceProvider,
    public profilesProvider: ProfilesProvider,
    public classroomProvider: ClassroomsProvider,
    public formBuilder: FormBuilder
  ) {
    this.frequency = formBuilder.group({
      date: [null, Validators.compose([Validators.required])]
    });

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this.profile = profile;
        this.classroom = this.navParams.get("classroom");
        if (this.classroom == null && this.profile.classroom != null) {
          this.classroomProvider
            .getClassroomById(this.profile.classroom)
            .then(res => {
              this.classroom = res;
              this.getEnrollments(this.classroom._id);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.classroom != null) {
          this.getEnrollments(this.classroom._id);
        }
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getEnrollments(_id: any): any {
    this.classroomProvider
      .getEnrollments(_id)
      .then(res => {
        res.forEach(element => {
          this.frequency.addControl(element.basic.CGM, new FormControl(false));
          this.frequency.addControl(
            element.basic.CGM + "_obs",
            new FormControl(null)
          );
        });
        this.students = res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  saveDaily() {
    console.log(this.frequency.value);
    this.classroomProvider
      .setFrequency(this.frequency.value, this.classroom._id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
