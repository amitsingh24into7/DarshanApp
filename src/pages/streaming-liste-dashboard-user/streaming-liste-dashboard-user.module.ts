import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StreamingListeDashboardUserPage } from './streaming-liste-dashboard-user';

@NgModule({
  declarations: [
    StreamingListeDashboardUserPage,
  ],
  imports: [
    IonicPageModule.forChild(StreamingListeDashboardUserPage),
  ],
})
export class StreamingListeDashboardUserPageModule {}
