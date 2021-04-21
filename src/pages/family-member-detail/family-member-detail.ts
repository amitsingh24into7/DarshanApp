import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the FamilyMemberDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-family-member-detail',
  templateUrl: 'family-member-detail.html',
})
export class FamilyMemberDetailPage {
  tabBarElement: any;
  account:any;
  isHeavenly: boolean;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.account=this.navParams.get('detailitem')
    this.onChangeNametitle(this.account.nametitle)
   
  }
  onChangeNametitle($event){
    debugger;
     if($event=='Heavenly')
     this.isHeavenly=true
     else
     this.isHeavenly=false
     ;
     //alert(this.isHeavenly);
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FamilyMemberDetailPage');
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  
}
