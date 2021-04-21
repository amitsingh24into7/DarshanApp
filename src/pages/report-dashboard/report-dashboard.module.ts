import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportDashboardPage } from './report-dashboard';

@NgModule({
  declarations: [
    ReportDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportDashboardPage),
  ],
})
export class ReportDashboardPageModule {}
