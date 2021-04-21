import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentdetailPage } from './paymentdetail';

@NgModule({
  declarations: [
    PaymentdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentdetailPage),
  ],
})
export class PaymentdetailPageModule {}
