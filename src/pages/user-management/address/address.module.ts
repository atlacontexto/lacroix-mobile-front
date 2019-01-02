import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AddressPage } from "./address";
import { AddressComponent } from "./address/address";

@NgModule({
  declarations: [AddressPage, AddressComponent],
  imports: [IonicPageModule.forChild(AddressPage)],
  exports: [AddressComponent]
})
export class AddressPageModule {}
