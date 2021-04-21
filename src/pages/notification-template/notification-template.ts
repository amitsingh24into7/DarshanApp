import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../providers';


/**
 * Generated class for the NotificationTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-template',
  templateUrl: 'notification-template.html',
})
export class NotificationTemplatePage {
  pageinfoobj: any;
  tabBarElement: any;
  pageUrl: any;
  account:{clientid:string, appid:string, username: string, email: string,userid:string,templeID:string,accessToken:string}={
    clientid: this.user.CLIENTID,
    appid: this.user.APPID,
    username: '',
    email: '',
    userid:'',
    templeID:'',
    accessToken:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer,public user: User) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pageinfoobj=navParams.get('item');
    console.log(this.pageinfoobj);
    user.gelocaldata(user.EMAIL_TOKEN_KEY).then(res => {
      this.account.email=res; 
      debugger; 
     
      user.gelocaldata(user.TOKEN_KEY).then(res => {
        this.account.username=res; 
       
        user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(res =>{
          this.account.userid=res; 
          this.user.gelocaldata(this.user.GOOGLE_ACCESS_TOKEN).then(accessToken=>{
            debugger;
            this.account.accessToken=accessToken;
            if(this.navParams.get('iteID')){       //---------USE Fore Update----------
              let templateiID= this.navParams.get('iteID')
              this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.user.IMAGELOCATION+'notificationFile/insertTemplate.php?from=mobileadsapp&&additionalinfo='+JSON.stringify(this.account)+'&templateiID='+templateiID);
            }else{
              this.account.templeID=this.pageinfoobj.TempleID;  
              this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.user.IMAGELOCATION+'notificationFile/insertTemplate.php?from=mobileadsapp&&additionalinfo='+JSON.stringify(this.account));
            }            
        
          })  
          })
       
      })
    })
        
  }  

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationTemplatePage');
    
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }

}
