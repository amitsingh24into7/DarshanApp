import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevoteeTemplatePage } from './devotee-template';

@NgModule({
  declarations: [
    DevoteeTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(DevoteeTemplatePage),
  ],
})
export class DevoteeTemplatePageModule {}
