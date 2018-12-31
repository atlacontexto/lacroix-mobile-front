import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { TranslateModule } from "@ngx-translate/core";
import { ExpandableComponent } from "./expandable/expandable";
import { DisciplinesListComponent } from "./disciplines-list/disciplines-list";
import { DocumentCommentsComponent } from "./document-comments/document-comments";
import { DocumentAttachmentsComponent } from "./document-attachments/document-attachments";
import { CommentsComponent } from "./comments/comments";
import { ProfileStatusHeaderComponent } from './profile-status-header/profile-status-header';

@NgModule({
  declarations: [
    ExpandableComponent,
    DisciplinesListComponent,
    DocumentCommentsComponent,
    DocumentAttachmentsComponent,
    CommentsComponent,
    ProfileStatusHeaderComponent
  ],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [
    ExpandableComponent,
    DisciplinesListComponent,
    DocumentCommentsComponent,
    DocumentAttachmentsComponent,
    CommentsComponent,
    ProfileStatusHeaderComponent
  ]
})
export class ComponentsModule {}
