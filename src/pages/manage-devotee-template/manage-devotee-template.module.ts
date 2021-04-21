import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageDevoteeTemplatePage } from './manage-devotee-template';

@NgModule({
  declarations: [
    ManageDevoteeTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageDevoteeTemplatePage),
  ],
})
export class ManageDevoteeTemplatePageModule {}
