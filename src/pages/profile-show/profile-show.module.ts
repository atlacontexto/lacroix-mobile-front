import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProfileShowPage } from "./profile-show";
import { ParallaxHeaderDirectiveModule } from "../../components/parallax-header/parallax-header.module";

@NgModule({
  declarations: [ProfileShowPage],
  imports: [
    IonicPageModule.forChild(ProfileShowPage),
    ParallaxHeaderDirectiveModule
  ]
})
export class ProfileShowPageModule {}
