import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the HelpCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-help-center",
  templateUrl: "help-center.html"
})
export class HelpCenterPage {
  source: any;

  items = [
    {
      title: "Como realizar um pagamento",
      expanded: false,
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque quod corporis itaque, cum numquam. Est vero voluptas sequi explicabo voluptate ipsa deleniti, necessitatibus accusamus autem tempora cumque nesciunt voluptatibus!"
    },
    {
      title: "Como scanear um QRCODE",
      expanded: false,
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque quod corporis itaque, cum numquam. Est vero voluptas sequi explicabo voluptate ipsa deleniti, necessitatibus accusamus autem tempora cumque nesciunt voluptatibus!"
    },
    {
      title: "Como recuperar a senha",
      expanded: false,
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque quod corporis itaque, cum numquam. Est vero voluptas sequi explicabo voluptate ipsa deleniti, necessitatibus accusamus autem tempora cumque nesciunt voluptatibus!"
    },
    {
      title: "Como cadastrar um cartão",
      expanded: false,
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque quod corporis itaque, cum numquam. Est vero voluptas sequi explicabo voluptate ipsa deleniti, necessitatibus accusamus autem tempora cumque nesciunt voluptatibus!"
    },
    {
      title: "Como cadastrar uma promoção",
      expanded: false,
      text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque quod corporis itaque, cum numquam. Est vero voluptas sequi explicabo voluptate ipsa deleniti, necessitatibus accusamus autem tempora cumque nesciunt voluptatibus!"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.source = this.navParams.get("source");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HelpCenterPage");
  }

  expandItem(item) {
    this.items.map(listItem => {
      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }
      return listItem;
    });
  }
}
