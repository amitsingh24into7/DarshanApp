import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StreamingListPage } from './streaming-list';

@NgModule({
  declarations: [
    StreamingListPage,
  ],
  imports: [
    IonicPageModule.forChild(StreamingListPage),
  ],
})
export class StreamingListPageModule {}
