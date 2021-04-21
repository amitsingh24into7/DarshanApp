import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDevoteeTemplatePage } from './create-devotee-template';

@NgModule({
  declarations: [
    CreateDevoteeTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDevoteeTemplatePage),
  ],
})
export class CreateDevoteeTemplatePageModule {}
