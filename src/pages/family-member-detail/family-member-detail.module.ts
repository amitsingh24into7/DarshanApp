import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamilyMemberDetailPage } from './family-member-detail';

@NgModule({
  declarations: [
    FamilyMemberDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FamilyMemberDetailPage),
  ],
})
export class FamilyMemberDetailPageModule {}
