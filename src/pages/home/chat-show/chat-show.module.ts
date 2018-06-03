import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatShowPage } from './chat-show';

@NgModule({
  declarations: [
    ChatShowPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatShowPage),
  ],
})
export class ChatShowPageModule {}
