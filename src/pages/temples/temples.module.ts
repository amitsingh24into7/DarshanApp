import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplesPage } from './temples';

@NgModule({
  declarations: [
    TemplesPage,
  ],
  imports: [
    IonicPageModule.forChild(TemplesPage),
  ],
})
export class TemplesPageModule {}
