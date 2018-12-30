import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatOthersPage } from './chat-others';

@NgModule({
  declarations: [
    ChatOthersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatOthersPage),
  ],
})
export class ChatOthersPageModule {}
