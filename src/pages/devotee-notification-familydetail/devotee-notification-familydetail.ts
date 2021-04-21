import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { User } from '../../providers';
//import { isDefined } from '@angular/compiler/src/util';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DevoteeNotificationFamilydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devotee-notification-familydetail',
  templateUrl: 'devotee-notification-familydetail.html',
})
export class DevoteeNotificationFamilydetailPage {
  tabBarElement: any;
  parmofpage: any;
  familyobj: ArrayBuffer;
  account:{templeid:string,appid:string, roleid:string,clientid:string,userid:string}={templeid:'',appid:'',roleid:'',clientid:'',userid:''}

  templateobj: any;
  googleappUrl: ArrayBuffer;
  appobj: { clientid:string, appid:string} = {
    clientid: "",
    appid: ""
  };

  
  listofNotification: ArrayBuffer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,private socialSharing: SocialSharing,public plt: Platform,private alertCtrl: AlertController) {
    this.account.appid=user.APPID;
    this.account.clientid=user.CLIENTID;
    this.appobj.appid=user.APPID;
    this.account.roleid=user.ROLE_ID_TOKEN_KEY;
    this.appobj.clientid=user.CLIENTID;
    this.parmofpage = navParams.get('pageinfo');
    this.account.templeid=this.parmofpage.templeid;
    this.account.userid=this.parmofpage.ID
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    user.get_Devotee_family(this.account).subscribe(resp=>{
      debugger;
      this.familyobj=resp.family;
      this.templateobj=resp.template;
      debugger;
    })
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DevoteeNotificationFamilydetailPage');
  }
  ionViewWillEnter() {
   
      this.user.get_my_notification_template(this.account).subscribe(data=>{
        this.listofNotification=data;
      })
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
  selecttemplate(msgdataobj,messageType,isFamily:any){
    //let file, url
    //let  appurl= this.googleappUrl[0]["AppURL"]
    //let attechment=''
    let tempobj:{msgdataobj:string, messageType:string,isFamily:string,userobj:string,templateobj:string,clientid:string, appid:string,roleid:string}={msgdataobj:'', messageType:'',isFamily:'',userobj:'',templateobj:'',clientid:this.user.CLIENTID, appid:this.user.APPID,roleid:this.user.ROLE_ID_TOKEN_KEY};
    
      if(messageType=='birthdate'){
         tempobj.templateobj=this.templateobj[0]
      }
      else if(messageType=='marriagedate'){
         tempobj.templateobj=this.templateobj[1]
      }
     else {
       tempobj.templateobj=this.templateobj[2];
     }
      

debugger;



if(isFamily){
  tempobj.msgdataobj=msgdataobj
  tempobj.messageType=messageType
  tempobj.isFamily=isFamily;
  tempobj.userobj=this.parmofpage
}else{
  tempobj.msgdataobj=msgdataobj
  tempobj.messageType=messageType
  tempobj.isFamily=isFamily;
}

this.user.send_Devotee_Notification(tempobj).subscribe(resp=>{
  if(resp.status=='success'){

  }
})
/** 
let template:any;
    this.user.gettemplateImageByTEMPLATEID({templateID:id}).subscribe(resp=>{
      template=resp
      template.forEach(element => {
        if(element.image_url!=''){
           attechment+=element.image_url+'\n\n';
        }
      })
      //this.socialSharing.share(message, subject, file, url).then(() => {
        this.socialSharing.share(attechment, '', this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', 'Please download the app for getting regular update.\n\nAndroid -   '+appurl).then(() => {
          // Sharing via email is possible
        }).catch(() => {
          // Sharing via email is not possible
        });
    })*/
    
  }
  socialSharingFunction(id,subject,message){
    //let file, url
    let  appurl= this.googleappUrl[0]["AppURL"]
    let attechment=''
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
              this.fb_share(subject,message,id);
             } else if(data=='whatsapp'){
              this.whatsapp_share(subject,message,id,this.googleappUrl[0]["AppURL"]);
             }
            }
          }
        ]
      });
      alert.present();


    }else{
    this.user.gettemplateImageByTEMPLATEID({templateID:id}).subscribe(resp=>{
      let imglist=resp;
      imglist.forEach(element => {
        if(element.image_url!=''){
           attechment+=element.image_url+'\n\n';
        }
      })   

      //this.socialSharing.share(message, subject, file, url).then(() => {
      this.socialSharing.share(attechment, '', this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', this.googleappUrl[0]["appshare_for_Admin"]+'\n\nAndroid -   '+appurl).then(() => {
        // Sharing via email is possible
      }).catch(() => {
        // Sharing via email is not possible
      });
    })

  }
  }
  fb_share(subject,message,id){
    var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?description='+subject+'&u='+this.user.IMAGELOCATION+'darshanapp/ogp/ads_'+id+'.html&picture='+this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', 'facebook-popup', 'height='+screen.availHeight+',width='+screen.availWidth);
    if(facebookWindow.focus) { facebookWindow.focus(); }
   }

   whatsapp_share(subject,message,id,appurl){
    var whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+this.user.IMAGELOCATION+'darshanapp/ogp/ads_'+id+'.html%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+appurl, 'whatsapp-popup', 'height='+screen.availHeight+',width='+screen.availWidth);
    if(whatsappWindow.focus) { whatsappWindow.focus(); }
   }
}

