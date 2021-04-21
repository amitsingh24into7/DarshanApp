import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDashbordPage } from './notification-dashbord';

@NgModule({
  declarations: [
    NotificationDashbordPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDashbordPage),
  ],
})
export class NotificationDashbordPageModule {}
