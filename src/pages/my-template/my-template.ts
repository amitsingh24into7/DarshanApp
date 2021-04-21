import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../providers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
/**
 * Generated class for the MyTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-template',
  templateUrl: 'my-template.html',
})
export class MyTemplatePage {
  
   //   backButton: {
//     image: 'back',
//     imagePressed: 'back_pressed',
//     align: 'left',
//     event: 'backPressed'
// },
// forwardButton: {
//     image: 'forward',
//     imagePressed: 'forward_pressed',
//     align: 'left',
//     event: 'forwardPressed'
// },
public options: ThemeableBrowserOptions = {
  statusbar: {
    color: '#ffffff',
  },
  toolbar: {
    height: 50,
    color: '#b74103',
  },
  
  closeButton: {
    wwwImage: 'assets/img/close.png',
    align: 'left',
    event: 'closePressed',
  },
};
  tabBarElement: any;
  pageinfoobj: any;
  account:{appid:string,clientid:string,roleid:string,userid:string,templeid:string,accessToken:string}={appid:"",clientid:'',roleid:"",userid:"",templeid:'',accessToken:''}
  listoftemplate: any;
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, public navParams: NavParams,public user:User,private alertCtrl: AlertController,private iab: InAppBrowser,private googlePlus: GooglePlus,private storage: Storage,private socialSharing: SocialSharing,public plt: Platform) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pageinfoobj=navParams.get('item');
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.account.appid=user.APPID
      this.account.roleid=user.ROLE_ID_TOKEN_KEY
      this.account.userid=data
      this.account.clientid=user.CLIENTID   
      this.account.templeid=this.pageinfoobj.TempleID
      this.user.getMytemplate(this.account).subscribe(resp=>{
        this.listoftemplate=resp;
      })
      this.googlePlus.trySilentLogin({'scopes': 'https://www.googleapis.com/auth/drive.file', 'offline': true})
      .then(res =>{ 
        this.storage.set(this.user.GOOGLE_ACCESS_TOKEN,res.accessToken);
        
        this.account.accessToken=res.accessToken;})
      .catch(err => console.error(err));

      
      })
     
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTemplatePage');
  }
  ionViewWillEnter()
  {
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.account.appid=this.user.APPID
      this.account.roleid=this.user.ROLE_ID_TOKEN_KEY
      this.account.userid=data
      this.account.clientid=this.user.CLIENTID   
      this.account.templeid=this.pageinfoobj.TempleID
      this.user.getMytemplate(this.account).subscribe(resp=>{
        this.listoftemplate=resp;
      })
     })

      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }

  openModule(item){ //----------------------Push on detail page-------------------
    debugger;
    this.navCtrl.push('MyTemplateDetailPage', {
      item: item
    });
  }
  
  presentConfirm(item) { //---------------------confarmation box for delete------------------------------------
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this template?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deletefunction(item) ////////-------------------call delete finction----------------------
            console.log('deletefunction clicked');
          }
        }
      ]
    });
    alert.present();
  }


  deletefunction(item){
    debugger;
    let postdata: { userid:string,  roleid:string, id: string,clientid:string } = {  
     
      clientid:this.account.clientid,
      roleid:this.account.roleid,
      userid:this.account.userid,
      id:item.id
  };
  let index = this.listoftemplate.indexOf(item);
    this.user.deleteMyTemplate(postdata).subscribe(data=>{
     // if(data.status='success'){
       

        if(index > -1){
          this.listoftemplate.splice(index, 1);
        }
     // }
    }, (err) => {

    });
   
  }
  editfunction(iteID){//----------------------Edit Function------------------------
    // this.navCtrl.push('NotificationTemplatePage', {
    //   iteID: iteID
    // });
    debugger;
    //let templateiID= iteID;
this.openNotificationTemplate(iteID);


  }

  openNotificationTemplate(templateiID){
    debugger;
    //const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/insertTemplate.php?from=mobileadsapp&&additionalinfo='+JSON.stringify(this.account)+'&templateiID='+templateiID, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no');

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'notificationFile/insertTemplate.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&templeid='+this.account.templeid+'&userid='+this.account.userid+'&roleid='+this.account.roleid+'&templateiID='+templateiID, '_blank', this.options);
    //const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/insertTemplate.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&templeid='+this.account.templeid+'&userid='+this.account.userid+'&roleid='+this.account.roleid+'&templateiID='+templateiID, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
    debugger;
    console.log(JSON.stringify(browser));
 
    // if (this.plt.is('cordova')) {
    //   browser.on('loadstop').subscribe(function (event) {
    //     if(event.url=='https://motleystack.com/notificationFile/insertTemplate.php#close'){
    //         browser.close();
    //     }
    //     //alert();
    // })
  //}
  
   
   }
   socialSharingFunction(subject,message){
    //let file, url
    //this.socialSharing.share(message, subject, file, url).then(() => {
    this.socialSharing.share(message, subject, '', '').then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });
  }
}
