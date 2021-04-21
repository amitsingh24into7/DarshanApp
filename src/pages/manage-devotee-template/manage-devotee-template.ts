import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../providers';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
/*import { InAppBrowser } from '@ionic-native/in-app-browser';
import { User } from '../../providers';
import { GooglePlus } from '@ionic-native/google-plus';*/

/**
 * Generated class for the ManageDevoteeTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-devotee-template',
  templateUrl: 'manage-devotee-template.html',
})
export class ManageDevoteeTemplatePage {
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
account:{clientid:string, appid:string, username: string, email: string,userid:string,templeID:string,accessToken:string}={
    clientid: '',
    appid: '',
    username: '',
    email: '',
    userid:'',
    templeID:'',
    accessToken:''
  }
  pageinfoobj: any;
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, public navParams: NavParams,public user:User,private googlePlus: GooglePlus,private storage: Storage,public plt: Platform, private iab: InAppBrowser) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    debugger;
    this.pageinfoobj=navParams.get('item');
   user.gelocaldata(user.EMAIL_TOKEN_KEY).then(res => {
      this.account.email=res; 
      debugger; 
      this.account.templeID=this.pageinfoobj.TempleID;  
      user.gelocaldata(user.TOKEN_KEY).then(res => {
        this.account.username=res; 
       
        user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(res =>{
          this.account.userid=res; 
          this.googlePlus.trySilentLogin({'scopes': 'https://www.googleapis.com/auth/drive.file', 'offline': true})
          .then(res =>{ 
            this.storage.set(this.user.GOOGLE_ACCESS_TOKEN,res.accessToken);
            
            this.account.accessToken=res.accessToken;})
          .catch(err => {console.log(err)});
         
           })
       
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageDevoteeTemplatePage');
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  
 
  openModule(componentName:any){
    debugger;
    this.navCtrl.push(componentName,{'item':this.pageinfoobj});
  }
   openNotificationTemplate(componentName:any){
    debugger;
  

    //const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/create_devotee_template.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&templeID='+this.account.templeID+'&username='+this.account.username+'&email='+this.account.email+'&userid='+this.account.userid, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'notificationFile/create_devotee_template.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&templeID='+this.account.templeID+'&username='+this.account.username+'&email='+this.account.email+'&userid='+this.account.userid, '_blank', this.options);
    debugger;
    console.log(JSON.stringify(browser));
    // if (this.plt.is('cordova')) {
    //           browser.on('exit').subscribe(function(event) {
    //           //this.openModule('MyTemplatePage');
    //           //this.navCtrl.push('MyTemplatePage',{'item':this.pageinfoobj});
    //       })
    //       browser.on('loadstop').subscribe(function (event) {
    //         if(event.url=='https://motleystack.com/notificationFile/create_devotee_template.php#close'){
    //             browser.close();
    //         }
    //         //alert();
    //     })
    // }
  }
}
