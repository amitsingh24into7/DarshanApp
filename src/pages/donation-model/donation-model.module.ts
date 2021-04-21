import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonationModelPage } from './donation-model';

@NgModule({
  declarations: [
    DonationModelPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationModelPage),
  ],
})
export class DonationModelPageModule {}
