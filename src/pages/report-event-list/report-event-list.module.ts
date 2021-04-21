import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportEventListPage } from './report-event-list';

@NgModule({
  declarations: [
    ReportEventListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportEventListPage),
  ],
})
export class ReportEventListPageModule {}
