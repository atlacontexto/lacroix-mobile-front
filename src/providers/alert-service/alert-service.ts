import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, MenuController, AlertController } from 'ionic-angular';

/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertServiceProvider {

  constructor(
    public http: HttpClient, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) {
  }

  presentAlert(title:string, subTitle: string, buttons) {
    var alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [buttons]
    });
    alert.present();
  }


}
