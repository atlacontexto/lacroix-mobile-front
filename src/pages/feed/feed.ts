import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  posts: Array<{ creator: string, avatar?: string, image?: string, message: string, date: string, countLikes: string, countComments: string, timeAgo: string }>
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.posts = [
      { creator: 'Savio', avatar: 'assets/imgs/placeholder.png', message: 'Este é o primeiro post da Atla', date: '1 abril, 2018', countLikes: '14 likes', countComments: '36 comentários', timeAgo: '1h' },
      { creator: 'Savio', avatar: 'assets/imgs/placeholder.png', message: 'Este é o primeiro post da Atla', date: '1 abril, 2018', countLikes: '14 likes', countComments: '36 comentários', timeAgo: '1h' },
      { creator: 'Savio', avatar: 'assets/imgs/placeholder.png', message: 'Este é o primeiro post da Atla', date: '1 abril, 2018', countLikes: '14 likes', countComments: '36 comentários', timeAgo: '1h' },
      { creator: 'Savio', avatar: 'assets/imgs/placeholder.png', message: 'Este é o primeiro post da Atla', date: '1 abril, 2018', countLikes: '14 likes', countComments: '36 comentários', timeAgo: '1h' }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

  select(post) {
    this.navCtrl.push('PostDetailPage', {}, {
      animate: true,
      direction: 'forward'
    })
  }

  onInput(event) {

  }

}
