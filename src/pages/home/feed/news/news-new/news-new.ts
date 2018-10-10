import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { FeedProvider } from "../../../../../providers/feed/feed";
import { ProfilesProvider } from "../../../../../providers/profiles/profiles";
import { Profile } from "../../../../../app/model/profile";
import { AlertProvider } from "../../../../../providers/alert-service/alert-service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

/**
 * Generated class for the NewsNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-news-new",
  templateUrl: "news-new.html"
})
export class NewsNewPage {
  @ViewChild("myInput")
  myInput: ElementRef;
  private newsContent: string;
  newsForm: FormGroup;
  currentProfile: Profile;
  private _unsubscribeAll: Subject<any>;
  options: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public feedProvider: FeedProvider,
    public profilesProvider: ProfilesProvider,
    public alertProvider: AlertProvider,
    public formBuilder: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
    this.newsForm = this.formBuilder.group({
      content: [null, Validators.compose([Validators.required])],
      visibility: [null, Validators.compose([Validators.required])]
    });
    this.options = [
      {
        value: "public",
        viewValue: "Público"
      },
      {
        value: "link",
        viewValue: "Apenas minha escola"
      }
    ];
  }

  ionViewDidLoad() {
    this.profilesProvider.currentProfile
      .pipe(
        filter(profile => profile instanceof Profile),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(profile => {
        this.currentProfile = profile;
      });
  }

  ionViewWillLeave() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  isProfile(): boolean {
    return this.currentProfile instanceof Profile;
  }

  resize() {
    var element = this.myInput[
      "_elementRef"
    ].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + "px";
    this.myInput["_elementRef"].nativeElement.style.height =
      scrollHeight + 16 + "px";
  }

  send() {
    console.log(this.newsContent);
    this.feedProvider
      .postNews(this.newsContent)
      .then(res => {
        console.log(res);
        this.feedProvider.getPostsByProfile(this.currentProfile.id);
      })
      .catch(err => {
        console.log(err);
      });
    this.newsContent = "";
    this.viewCtrl.dismiss();
  }

  dismiss() {
    if (this.newsContent) {
      let abortConfirm = this.alertProvider.alertCtrl.create({
        title: "Cancelar publicação?",
        message: "Sua mensagem será descartada",
        buttons: [
          { text: "Voltar", role: "back", handler: data => {} },
          {
            text: "Descartar",
            role: "discart",
            handler: data => {
              this.viewCtrl.dismiss();
            }
          }
        ]
      });
      abortConfirm.present();
    } else {
      this.viewCtrl.dismiss();
    }
  }

  showProfile(profile?: Profile): void {
    console.log(profile);
    if (!profile) {
      this.navCtrl.push("ProfileShowPage", this.currentProfile);
    } else {
      this.navCtrl.push("ProfileShowPage", profile);
    }
  }
}
