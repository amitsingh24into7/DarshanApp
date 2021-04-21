import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFamilyMemberPage } from './add-family-member';

@NgModule({
  declarations: [
    AddFamilyMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFamilyMemberPage),
  ],
})
export class AddFamilyMemberPageModule {}
