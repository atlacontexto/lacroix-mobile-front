import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FeedPage } from "./feed";
import { NewsNewPage } from "./news/news-new/news-new";
import { NewsEditPage } from "./news/news-edit/news-edit";
import { LastNewsComponent } from "./components/last-news/last-news";
import { NewsShowComponent } from "./news/news-show/news-show";
import { NewsCommentsComponent } from "./news/news-comments/news-comments";
import { NewsShowOneComponent } from "./news/news-show-one/news-show-one";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    FeedPage,
    NewsNewPage,
    NewsEditPage,
    LastNewsComponent,
    NewsShowComponent,
    NewsCommentsComponent,
    NewsShowOneComponent
  ],
  imports: [IonicPageModule.forChild(FeedPage), TranslateModule.forChild()],
  entryComponents: [
    NewsNewPage,
    NewsEditPage,
    LastNewsComponent,
    NewsShowComponent,
    NewsCommentsComponent,
    NewsShowOneComponent
  ],
  exports: [NewsCommentsComponent, NewsShowOneComponent, NewsShowComponent]
})
export class FeedPageModule {}
