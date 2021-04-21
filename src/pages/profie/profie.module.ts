import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiePage } from './profie';

@NgModule({
  declarations: [
    ProfiePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiePage),
  ],
})
export class ProfiePageModule {}
