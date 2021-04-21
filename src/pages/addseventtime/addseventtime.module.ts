import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddseventtimePage } from './addseventtime';
import { NgDatepickerModule } from 'ng2-datepicker';
@NgModule({
  declarations: [
    AddseventtimePage,
  ],
  imports: [
    NgDatepickerModule,
    IonicPageModule.forChild(AddseventtimePage),
  ],
})
export class AddseventtimePageModule {}


