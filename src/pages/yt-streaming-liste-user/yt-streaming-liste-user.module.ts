import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YtStreamingListeUserPage } from './yt-streaming-liste-user';

@NgModule({
  declarations: [
    YtStreamingListeUserPage,
  ],
  imports: [
    IonicPageModule.forChild(YtStreamingListeUserPage),
  ],
})
export class YtStreamingListeUserPageModule {}
