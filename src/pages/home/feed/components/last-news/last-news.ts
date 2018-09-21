import { Component } from "@angular/core";

/**
 * Generated class for the LastNewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "last-news",
  templateUrl: "last-news.html"
})
export class LastNewsComponent {
  partners: { partner: string; info1: string; info2: string; icon: string }[];

  constructor() {
    this.partners = [
      {
        partner: "Abrinq",
        info1: "Phoria",
        info2: "Volition",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Algar",
        info1: "Adele",
        info2: "25",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Balaroti",
        info1: "Queen",
        info2: "A Night at the Opera",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Burguer King",
        info1: "Journey",
        info2: "Escape",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Bradesco",
        info1: "Nirvana",
        info2: "Nevermind",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Imax",
        info1: "The Beatles",
        info2: "Magical Mystery Tour",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Madero",
        info1: "The Eagles",
        info2: "Hotel California",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Outback",
        info1: "Nine Inch Nails",
        info2: "With Teeth",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Renault",
        info1: "The Who",
        info2: "Who Are You",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Subway",
        info1: "The Who",
        info2: "Who Are You",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Uber",
        info1: "The Who",
        info2: "Who Are You",
        icon: "assets/images/avatars/profile.jpg"
      },
      {
        partner: "Walmart",
        info1: "The Who",
        info2: "Who Are You",
        icon: "assets/images/avatars/profile.jpg"
      }
    ];
  }

  slideChanged(ev) {
    // console.log(ev);
    // console.log(this.slides.isEnd());
    // console.log();
    if (this.slides._activeIndex == 2) {
      this.slides.lockSwipeToNext(true);
    } else this.slides.lockSwipeToNext(false);
  }
}
