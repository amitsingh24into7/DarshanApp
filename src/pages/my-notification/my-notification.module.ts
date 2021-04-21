import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNotificationPage } from './my-notification';

@NgModule({
  declarations: [
    MyNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNotificationPage),
  ],
})
export class MyNotificationPageModule {}
