import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFamilyListPage } from './my-family-list';

@NgModule({
  declarations: [
    MyFamilyListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFamilyListPage),
  ],
})
export class MyFamilyListPageModule {}
