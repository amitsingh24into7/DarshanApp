import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicelistPage } from './servicelist';

@NgModule({
  declarations: [
    ServicelistPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicelistPage),
  ],
})
export class ServicelistPageModule {}
