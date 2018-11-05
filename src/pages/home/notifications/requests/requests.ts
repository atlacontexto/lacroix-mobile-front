import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subject } from "rxjs";
import { ProfilesProvider } from "../../../../providers/profiles/profiles";
import { takeUntil, filter } from "rxjs/operators";
import { Profile } from "../../../../app/model/profile";
import { AlertController } from "ionic-angular";

/**
 * Generated class for the RequestsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "requests",
  templateUrl: "requests.html"
})
export class RequestsComponent implements OnInit, OnDestroy {
  @Input()
  requests: Array<{}>;
  @Input()
  status: string;

  private _unsubscribeAll: Subject<any>;
  constructor(
    public _profilesProvider: ProfilesProvider,
    public alertCtrl: AlertController
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._profilesProvider.currentProfile
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(profile => profile instanceof Profile)
      )
      .subscribe(profile => {
        console.log(profile);
      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  action(action, id) {
    this._profilesProvider
      .changeStatus(action, id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        let alertChange = this.alertCtrl.create({
          title: "Erro na alteração",
          message: "Ocorreu um erro interno. Tente novamente mais tarde"
        });
        alertChange.present();
      });
  }
}
