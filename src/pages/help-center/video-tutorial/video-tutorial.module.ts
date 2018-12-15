import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoTutorialPage } from './video-tutorial';

@NgModule({
  declarations: [
    VideoTutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoTutorialPage),
  ],
})
export class VideoTutorialPageModule {}
