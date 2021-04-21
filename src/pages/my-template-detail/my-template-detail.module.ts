import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTemplateDetailPage } from './my-template-detail';

@NgModule({
  declarations: [
    MyTemplateDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTemplateDetailPage),
  ],
})
export class MyTemplateDetailPageModule {}
