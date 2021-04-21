import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayCalendarPage } from './today-calendar';

@NgModule({
  declarations: [
    TodayCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(TodayCalendarPage),
  ],
})
export class TodayCalendarPageModule {}
