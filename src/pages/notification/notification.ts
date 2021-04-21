import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {  User } from '../../providers/user/user'
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  public notification:any;
  userinfo:{clientid:string,appid:string,userid:string}={clientid:'',appid:'',userid:''}
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams,public user:User) {
    
   
  }
  ionViewWillEnter() {
    this.userinfo.clientid=this.user.CLIENTID
    this.userinfo.appid=this.user.APPID;
    this.user.USER_ID_TOKEN_KEY;
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      debugger;
      this.userinfo.userid=data;

      this.user.getNotification(this.userinfo).subscribe((data)=>{
        this.notification=data;
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  ionViewWillLeave()
  {
      //alert("l");
  }

  
opennotification(item){
  let alert = this.alertCtrl.create({
    title: item.title,
    message:item.description,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  alert.present();


}


opendetail(obj){
  this.navCtrl.push('NotificationDetailPage',{detailovj:obj})
}
}
