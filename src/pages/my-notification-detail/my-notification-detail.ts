import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { User } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the MyNotificationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-my-notification-detail',
  templateUrl: 'my-notification-detail.html',
})
export class MyNotificationDetailPage {
  tabBarElement: any;
  notificationObj: any;
  imglist: any;
  googleappUrl: ArrayBuffer;
  appobj: { clientid:string, appid:string} = {
    clientid: "",
    appid: ""
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,private socialSharing: SocialSharing,public platform: Platform,private alertCtrl: AlertController) {
    this.appobj.appid=user.APPID;
    this.appobj.clientid=user.CLIENTID;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.notificationObj=navParams.get('item');
    user.gettemplateImageByTEMPLATEID({templateID:this.notificationObj.id}).subscribe(resp=>{
      this.imglist=resp;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNotificationDetailPage');
  }
  ionViewWillEnter()
  {
    this.user.getAppUrl(this.appobj).subscribe(data=>{
      if(data){
        debugger;
       this.googleappUrl=data
      }
    })
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  
  socialSharingFunction(notificationType,subject,message,id){
    if(this.platform.is('core'))
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
              this.fb_share(subject,message,id);
             } else if(data=='whatsapp'){
              this.whatsapp_share(notificationType,subject,message,id);
             }
            }
          }
        ]
      });
      alert.present();

      

    }else{
          let  appurl= this.googleappUrl[0]["AppURL"]
          let  msgcontent= this.googleappUrl[0]["appshare_for_Admin"]
          let attechment=''
          this.imglist.forEach(element => {
            if(element.image_url!=''){
               attechment+=element.image_url+'\n\n';
            }
          })    
          if(notificationType=='Normal'){ 
            this.socialSharing.share(message, '','', msgcontent+'\n\nAndroid -   '+appurl).then(() => {
              // Sharing via email is possible
            }).catch(() => {
              // Sharing via email is not possible
            });
          }else{
          this.socialSharing.share(attechment, '', this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', msgcontent+'\n\nAndroid -   '+appurl).then(() => {
            // Sharing via email is possible
          }).catch(() => {
            // Sharing via email is not possible
          });
        }
    }      
   }  

   fb_share(subject,message,id){
    var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?description='+subject+'&u='+this.user.IMAGELOCATION+'darshanapp/ogp/ads_'+id+'.html&picture='+this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', 'facebook-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
    if(facebookWindow.focus) { facebookWindow.focus(); }
   }

   whatsapp_share(notificationType,subject,message,id){
    if(notificationType=='Normal'){ 
      let  whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+message+'%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+this.googleappUrl[0]["AppURL"], 'whatsapp-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
      if(whatsappWindow.focus) { whatsappWindow.focus(); }
    }else{
    var whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+this.user.IMAGELOCATION+'darshanapp/ogp/ads_'+id+'.html%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+this.googleappUrl[0]["AppURL"], 'whatsapp-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
    if(whatsappWindow.focus) { whatsappWindow.focus(); }
    }
   }
}

