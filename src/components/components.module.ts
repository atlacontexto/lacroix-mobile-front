import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { TranslateModule } from "@ngx-translate/core";
import { ExpandableComponent } from "./expandable/expandable";
import { DisciplinesListComponent } from "./disciplines-list/disciplines-list";
import { DocumentCommentsComponent } from "./document-comments/document-comments";
import { DocumentAttachmentsComponent } from "./document-attachments/document-attachments";
import { CommentsComponent } from "./comments/comments";

@NgModule({
  declarations: [
    ExpandableComponent,
    DisciplinesListComponent,
    DocumentCommentsComponent,
    DocumentAttachmentsComponent,
    CommentsComponent
  ],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [
    ExpandableComponent,
    DisciplinesListComponent,
    DocumentCommentsComponent,
    DocumentAttachmentsComponent,
    CommentsComponent
  ]
})
export class ComponentsModule {}
