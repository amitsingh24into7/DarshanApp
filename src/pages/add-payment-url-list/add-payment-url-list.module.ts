import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPaymentUrlListPage } from './add-payment-url-list';

@NgModule({
  declarations: [
    AddPaymentUrlListPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPaymentUrlListPage),
  ],
})
export class AddPaymentUrlListPageModule {}
