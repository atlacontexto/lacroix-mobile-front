import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { ProfilesProvider } from "../../../providers/profiles/profiles";
import { Profile } from "../../../app/model/profile";

interface Message {
  content: string;
  senderId: String;
  receiverId: String;
  createdAt: Date;
}

/**
 * Generated class for the ChatShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chat-show",
  templateUrl: "chat-show.html"
})
export class ChatShowPage {
  private currentProfile: Profile;
  private messages: Observable<Message[]>;
  private messagesCollection: AngularFirestoreCollection<Message>;
  private message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profilesProvider: ProfilesProvider,
    private fs: AngularFirestore
  ) {
    this.messagesCollection = this.fs.collection("messages", ref =>
      ref.orderBy("createdAt")
    );
    this.messages = this.messagesCollection.valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatShowPage");
    this.profilesProvider.currentProfile.subscribe(profile => {
      this.currentProfile = profile;

      console.log("meu id: ", this.currentProfile.id);
      console.log("id outro: ", this.navParams.get("item"));
    });
  }

  comment() {
    this.messagesCollection.add({
      content: this.message,
      senderId: this.currentProfile.id,
      receiverId: this.navParams.get("item")["_id"],
      createdAt: new Date()
    });
  }
}
