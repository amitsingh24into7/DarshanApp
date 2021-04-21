import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartListDetailPage } from './cart-list-detail';

@NgModule({
  declarations: [
    CartListDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CartListDetailPage),
  ],
})
export class CartListDetailPageModule {}
