import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BasicInfoComponent } from './user-management/basic-info/basic-info';
@NgModule({
	declarations: [BasicInfoComponent],
	imports: [IonicModule],
	exports: [BasicInfoComponent]
})
export class ComponentsModule {}
