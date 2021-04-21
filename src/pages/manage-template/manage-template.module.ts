import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTemplatePage } from './manage-template';

@NgModule({
  declarations: [
    ManageTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageTemplatePage),
  ],
})
export class ManageTemplatePageModule {}
