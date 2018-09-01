import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { TranslateModule } from "@ngx-translate/core";
import { ExpandableComponent } from "./expandable/expandable";

@NgModule({
  declarations: [ExpandableComponent],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [ExpandableComponent]
})
export class ComponentsModule {}
