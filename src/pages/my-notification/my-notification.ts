import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { User } from '../../providers';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
/**
 * Generated class for the MyNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-notification',
  templateUrl: 'my-notification.html',
})
export class MyNotificationPage {
   
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
  listofNotification:any
  templeobj:any
  appobj: { clientid:string, appid:string} = {
    clientid: "",
    appid: ""
  };
  account: { templeid:string,  roleid:string, appid: string,clientid:string ,userid:string,accessToken:string} = {  
    appid:'',
    clientid:'',
    roleid:'',
    userid:'',
    templeid:'',
    accessToken:''
};
  navParamsObj: any;
  googleappUrl: ArrayBuffer;
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController,private iab: InAppBrowser, public user: User, public navParams: NavParams,private alertCtrl: AlertController,private googlePlus: GooglePlus,private storage: Storage,private socialSharing: SocialSharing,public plt: Platform) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.account.roleid=user.ROLE_ID_TOKEN_KEY
    this.account.appid=user.APPID;
    this.account.clientid=user.CLIENTID;
    this.appobj.appid=user.APPID;
    this.appobj.clientid=user.CLIENTID;
    this.templeobj=navParams.get('item');
    this.account.templeid=this.templeobj.TempleID
    debugger;
    this.googlePlus.trySilentLogin({'scopes': 'https://www.googleapis.com/auth/drive.file', 'offline': true})
          .then(res =>{ 
            this.storage.set(this.user.GOOGLE_ACCESS_TOKEN,res.accessToken);
            
            this.account.accessToken=res.accessToken;})
          .catch(err => {console.log(err)});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNotificationPage');
  }
  ionViewWillEnter()
  {
    this.user.getAppUrl(this.appobj).subscribe(data=>{
      if(data){
        debugger;
       this.googleappUrl=data
      }
    })

    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.account.userid =resp;
      this.user.get_my_notification(this.account).subscribe(data=>{
        this.listofNotification=data;
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
    this.navCtrl.push('MyNotificationDetailPage', {
      item: item
    });
  }
  presentConfirm(item) { //---------------------confarmation box for delete------------------------------------
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this ads?',
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
  let index = this.listofNotification.indexOf(item);
    this.user.deleteMyNotification(postdata).subscribe(data=>{
     // if(data.status='success'){
       

        if(index > -1){
          this.listofNotification.splice(index, 1);
        }
     // }
    }, (err) => {

    });

   
  }
  // editfunction(iteID){//----------------------Edit Function------------------------
  //   this.navCtrl.push('SendNotificationPage', {
  //     iteID: iteID
  //   });

  // }
  socialSharingFunction(notificationType,subject,message,id){


    if(this.plt.is('core'))
    {
      let alert = this.alertCtrl.create({
        title: 'Select one?',
       
        message: "Please select one",
        inputs: [
          {
            type: 'radio',
            label: 'share on whatsapp',
            value: 'whatsapp',
          },
          {
            type: 'radio',
            label: 'share on facebook',
            value: 'facebook',
          }
        ],
        buttons: [
          {
            text: 'Submit',
            handler: (data: any) => {
             if(data=='facebook'){
              this.fb_share(notificationType,subject,message,id);
             } else if(data=='whatsapp'){
              this.whatsapp_share(notificationType,subject,message,id,this.googleappUrl[0]["AppURL"]);
             }
            }
          }
        ]
      });
      alert.present();


    }else{


    //let file, url
    let  appurl= this.googleappUrl[0]["AppURL"]
    let attechment=''
debugger;
let template:any;
    this.user.gettemplateImageByTEMPLATEID({templateID:id}).subscribe(resp=>{
      template=resp
      template.forEach(element => {
        if(element.image_url!=''){
           attechment+=element.image_url+'\n\n';
        }
      })
      //this.socialSharing.share(message, subject, file, url).then(() => {
        if(notificationType=='Normal'){ 
          this.socialSharing.share(attechment, '', this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', this.googleappUrl[0]["appshare_for_Admin"]+'\n\nAndroid -   '+appurl).then(() => {
            // Sharing via email is possible
          }).catch(() => {
            // Sharing via email is not possible
          });
        }else{
        this.socialSharing.share(attechment, '', this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', this.googleappUrl[0]["appshare_for_Admin"]+'\n\nAndroid -   '+appurl).then(() => {
          // Sharing via email is possible
        }).catch(() => {
          // Sharing via email is not possible
        });
      }
    })
    

  }
    
  }

  fb_share(notificationType,subject,message,id){
    // if(notificationType=='Normal'){
    //   var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?description='+message+'&u=&picture=', 'facebook-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
    //   if(facebookWindow.focus) { facebookWindow.focus(); }
    // }else{
      var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?description='+subject+'&u='+this.user.IMAGELOCATION+'darshanapp/ogp/ads_'+id+'.html&picture='+this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', 'facebook-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
      if(facebookWindow.focus) { facebookWindow.focus(); }
   // }
    
   }

   

   whatsapp_share(notificationType,subject,message,id,appurl){
    if(notificationType=='Normal'){
      let  whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+message+'%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+appurl, 'whatsapp-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
      if(whatsappWindow.focus) { whatsappWindow.focus(); }
    }else{
      let whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+this.user.IMAGELOCATION+'darshanapp/ogp/ads_'+id+'.html%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+appurl, 'whatsapp-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
    if(whatsappWindow.focus) { whatsappWindow.focus(); }
    }
   }

  openSendNotification(id){
    this.navParamsObj=this.navParams.get('item');
          this.account.templeid=this.navParamsObj.TempleID
         debugger; 

    //const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/send_notification.php?from=mobileadsapp&additionalinfo='+JSON.stringify(this.account)+'&myadsid='+id, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no');
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'notificationFile/send_notification.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&roleid='+this.account.roleid+'&templeid='+this.account.templeid+'&userid='+this.account.userid+'&myadsid='+id, '_blank', this.options);


    //const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/send_notification.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&roleid='+this.account.roleid+'&templeid='+this.account.templeid+'&userid='+this.account.userid+'&myadsid='+id, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
    debugger;
    // if (this.plt.is('cordova')) {
    //         browser.on('loadstop').subscribe(function (event) {
    //         if(event.url=='https://motleystack.com/notificationFile/send_notification.php#close'){
    //             browser.close();
    //         }
    //         //alert();
    //     })
    // }
    
  }   


}