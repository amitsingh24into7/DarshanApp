import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduledStreaminListPage } from './scheduled-streamin-list';

@NgModule({
  declarations: [
    ScheduledStreaminListPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduledStreaminListPage),
  ],
})
export class ScheduledStreaminListPageModule {}
