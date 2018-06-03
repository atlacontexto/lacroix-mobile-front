import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { BasicInfoComponent } from "./user-management/basic-info/basic-info";
import { ProfilesComponent } from "./user-management/profiles/profiles";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  declarations: [BasicInfoComponent, ProfilesComponent],
  imports: [IonicModule, TranslateModule.forChild()],
  exports: [BasicInfoComponent, ProfilesComponent]
})
export class ComponentsModule {}
