import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';
import { NewsNewPage } from './news/news-new/news-new';
import { NewsEditPage } from './news/news-edit/news-edit';

@NgModule({
  declarations: [
    FeedPage,
    NewsNewPage,
    NewsEditPage
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
  ],
  entryComponents: [
    NewsNewPage,
    NewsEditPage
  ] 
})
export class FeedPageModule {}
