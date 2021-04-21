import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPaymentUrlPage } from './add-payment-url';

@NgModule({
  declarations: [
    AddPaymentUrlPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPaymentUrlPage),
  ],
})
export class AddPaymentUrlPageModule {}
