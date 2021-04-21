import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportEventDetailPage } from './report-event-detail';

@NgModule({
  declarations: [
    ReportEventDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportEventDetailPage),
  ],
})
export class ReportEventDetailPageModule {}
