import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  LoadingController,
  ToastController,
  AlertController
} from "ionic-angular";

/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {
  loading: any;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  presentTimeLoading(message: string) {
    let loading = this.loadingCtrl.create({
      content: message
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  presentControlledLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  presentAlert(title: string, subTitle: string, buttons) {
    var alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [buttons]
    });
    alert.present();
  }
}
