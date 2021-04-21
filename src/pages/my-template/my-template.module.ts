import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTemplatePage } from './my-template';

@NgModule({
  declarations: [
    MyTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(MyTemplatePage),
  ],
})
export class MyTemplatePageModule {}
