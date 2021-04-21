import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddseventPage } from './addsevent';
//import { DatePickerModule } from 'ionic-calendar-date-picker';
import { NgDatepickerModule } from 'ng2-datepicker';
@NgModule({
  declarations: [
    AddseventPage,
  ],
  imports: [
    //DatePickerModule,
    NgDatepickerModule,
    IonicPageModule.forChild(AddseventPage),
  ],
})
export class AddseventPageModule {}
