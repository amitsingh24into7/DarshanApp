import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNotificationDetailPage } from './my-notification-detail';

@NgModule({
  declarations: [
    MyNotificationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNotificationDetailPage),
  ],
})
export class MyNotificationDetailPageModule {}
