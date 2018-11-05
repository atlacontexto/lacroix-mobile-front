import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PostDetailPage } from "./post-detail";
import { FeedPageModule } from "../home/feed/feed.module";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [PostDetailPage],
  imports: [
    IonicPageModule.forChild(PostDetailPage),
    FeedPageModule,
    ComponentsModule
  ]
})
export class PostDetailPageModule {}
