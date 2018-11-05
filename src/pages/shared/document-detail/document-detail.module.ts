import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DocumentDetailPage } from "./document-detail";
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [DocumentDetailPage],
  imports: [IonicPageModule.forChild(DocumentDetailPage), ComponentsModule]
})
export class DocumentDetailPageModule {}
