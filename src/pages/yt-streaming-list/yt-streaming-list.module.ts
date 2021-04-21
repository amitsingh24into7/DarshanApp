import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YtStreamingListPage } from './yt-streaming-list';

@NgModule({
  declarations: [
    YtStreamingListPage,
  ],
  imports: [
    IonicPageModule.forChild(YtStreamingListPage),
  ],
})
export class YtStreamingListPageModule {}
