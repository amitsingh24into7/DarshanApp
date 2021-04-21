import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the DevoteeTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devotee-template',
  templateUrl: 'devotee-template.html',
})
export class DevoteeTemplatePage {
  account: { templeid:string,  roleid:string, appid: string,clientid:string ,userid:string,accessToken:string} = {  
    appid:'',
    clientid:'',
    roleid:'',
    userid:'',
    templeid:'',
    accessToken:''
};
  tabBarElement: any;
  appobj: { clientid:string, appid:string} = {
    clientid: "",
    appid: ""
  };
  templeobj: any;
  googleappUrl: ArrayBuffer;
  listofNotification: ArrayBuffer;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public user:User,private socialSharing: SocialSharing) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.account.roleid=user.ROLE_ID_TOKEN_KEY
    this.account.appid=user.APPID;
    this.account.clientid=user.CLIENTID;
    this.appobj.appid=user.APPID;
    this.appobj.clientid=user.CLIENTID;
    this.templeobj=navParams.get('item');
    this.account.templeid=this.templeobj.TempleID
    debugger;
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
      this.user.get_Devotee_notification(this.account).subscribe(data=>{
        this.listofNotification=data;
      })
    })
   
    this.tabBarElement.style.display = 'none';
  }


  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DevoteeTemplatePage');
  }
  selecttemplate(userobj){
    let alert = this.alertCtrl.create({
      title: 'Select Notification Type',
      inputs: [
        {
          type: 'radio',
          label: 'label 1',
          value: '0'
        },
        {
          type: 'radio',
          label: 'label 2',
          value: '1'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Buy clicked',data );
          }
        }
      ]
    });
    alert.present();
  }
  openDetail(modulename,itemobj){
    this.navCtrl.push(modulename,{pageinfo:itemobj});
  }
  socialSharingFunction(subject,message,id){
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
        this.socialSharing.share(attechment, '', this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', 'Please download the app for getting regular update.\n\nAndroid -   '+appurl).then(() => {
          // Sharing via email is possible
        }).catch(() => {
          // Sharing via email is not possible
        });
    })
    
  }
}