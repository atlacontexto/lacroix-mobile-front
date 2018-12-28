import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AngularFireModule } from "angularfire2";
import { AngularFirestore } from "angularfire2/firestore";

import { ChatPage } from "./chat";
import { ChatOthersPage } from "../chat-others/chat-others";

@NgModule({
  declarations: [ChatPage, ChatOthersPage],
  imports: [IonicPageModule.forChild(ChatPage)],
  entryComponents: [ChatOthersPage],
  providers: [AngularFirestore]
})
export class ChatPageModule {}
