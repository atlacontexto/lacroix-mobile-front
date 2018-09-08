import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RegisterPhonePage } from "./register-phone";
import { TranslateModule } from "@ngx-translate/core";
import { BrMaskerModule } from "brmasker-ionic-3";

@NgModule({
  declarations: [RegisterPhonePage],
  imports: [
    IonicPageModule.forChild(RegisterPhonePage),
    TranslateModule.forChild(),
    BrMaskerModule
  ]
})
export class RegisterPhonePageModule {}
