import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Slide {
  title: string;
  description: string;
  image: string;
  icone: string;
}

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  slides: Slide[];
  class: string = 'slide1';
  dir: string = 'ltr';
  showSkip = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public translate: TranslateService
  ) {
    this.dir = platform.dir();
    this.translate.get([
      "LANDING_SLIDE1_TITLE",
      "LANDING_SLIDE1_DESCRIPTION",
      "LANDING_SLIDE2_TITLE",
      "LANDING_SLIDE2_DESCRIPTION",
      "LANDING_SLIDE3_TITLE",
      "LANDING_SLIDE3_DESCRIPTION",
      "LANDING_SLIDE4_TITLE",
      "LANDING_SLIDE4_DESCRIPTION",
      "LANDING_SLIDE5_TITLE",
      "LANDING_SLIDE5_DESCRIPTION",
      "LANDING_SLIDE6_TITLE",
      "LANDING_SLIDE6_DESCRIPTION"
    ]).subscribe(
      values => {
        console.log(values);
        this.slides = [
          {
            title: values.LANDING_SLIDE1_TITLE,
            description: values.LANDING_SLIDE1_DESCRIPTION,
            image: 'slide1',
            icone: 'assets/imgs/icone-slide1.jpg'
          },
          {
            title: values.LANDING_SLIDE2_TITLE,
            description: values.LANDING_SLIDE2_DESCRIPTION,
            image: 'slide2',
            icone: 'assets/imgs/icone-slide2.jpg'
          },
          {
            title: values.LANDING_SLIDE3_TITLE,
            description: values.LANDING_SLIDE3_DESCRIPTION,
            image: 'slide3',
            icone: 'assets/imgs/icone-slide3.jpg'
          },
          {
            title: values.LANDING_SLIDE4_TITLE,
            description: values.LANDING_SLIDE4_DESCRIPTION,
            image: 'slide4',
            icone: 'assets/imgs/icone-slide4.jpg'
          },
          {
            title: values.LANDING_SLIDE5_TITLE,
            description: values.LANDING_SLIDE5_DESCRIPTION,
            image: 'slide5',
            icone: 'assets/imgs/icone-slide5.jpg'
          },
          {
            title: values.LANDING_SLIDE6_TITLE,
            description: values.LANDING_SLIDE6_DESCRIPTION,
            image: 'slide6',
            icone: 'assets/imgs/icone-slide6.jpg'
          }
        ]
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  next() {

  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
    if (this.slides[slider.getActiveIndex()]) {
      this.class = this.slides[slider.getActiveIndex()].image;
    }
  }

}
