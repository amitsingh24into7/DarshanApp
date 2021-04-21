import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddtemplePage } from './addtemple';
import {RichTextComponent} from '../../components/rich-text/rich-text'

@NgModule({
  declarations: [
    AddtemplePage,RichTextComponent
  ],
  entryComponents: [RichTextComponent],
  
  imports: [
    IonicPageModule.forChild(AddtemplePage),
  ],
})
export class AddtemplePageModule {}
