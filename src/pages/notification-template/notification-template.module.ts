import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationTemplatePage } from './notification-template';

@NgModule({
  declarations: [
    NotificationTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationTemplatePage),
  ],
})
export class NotificationTemplatePageModule {}
