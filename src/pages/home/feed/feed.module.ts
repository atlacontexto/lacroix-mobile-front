import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FeedPage } from "./feed";
import { NewsNewPage } from "./news/news-new/news-new";
import { NewsEditPage } from "./news/news-edit/news-edit";
import { LastNewsComponent } from "./components/last-news/last-news";

@NgModule({
  declarations: [FeedPage, NewsNewPage, NewsEditPage, LastNewsComponent],
  imports: [IonicPageModule.forChild(FeedPage)],
  entryComponents: [NewsNewPage, NewsEditPage, LastNewsComponent]
})
export class FeedPageModule {}
