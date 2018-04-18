import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, IonicPage, NavParams } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(
    public navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'De: ' + start + '<br>Às: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

}
