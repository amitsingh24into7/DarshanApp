import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the MyFamilyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-family-list',
  templateUrl: 'my-family-list.html',
})
export class MyFamilyListPage {
  tabBarElement: any;
myfamilylist:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public user:User,private alertCtrl: AlertController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFamilyListPage');
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    let account={userid:Number}={userid:null}
    debugger;
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(res => {
      account.userid=res; 
       this.user.getMyFamily(account).subscribe(resp=>{
      this.myfamilylist=resp
    })
    })
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  addfamilyMember(){
    this.navCtrl.push('AddFamilyMemberPage');
  }
  
  detailfunction(detailobj){
    this.navCtrl.push('FamilyMemberDetailPage',{'detailitem':detailobj});
  }
  deleteConfirm(tempobj) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let famID={famID:Number}={famID:tempobj.id}
            this.user.deleteMyFamily(famID).subscribe((resp)=>{
            if(resp.status=="success"){
              let index = this.myfamilylist.indexOf(tempobj);
        
            if(index > -1){
              this.myfamilylist.splice(index, 1);
            }
            //this.addedtemplebyuser
            
            }
        
            })
            console.log('Yes clicked');
          }
        }
      ]
    });
    alert.present();
  }


  openmoduleforupdate(componentName:any,tempobj:any){
    this.navCtrl.push(componentName,{'updateitem':tempobj});
  }
  

}
