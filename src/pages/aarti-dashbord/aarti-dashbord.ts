import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { User } from '../../providers';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook } from '@ionic-native/facebook';
/**
 * Generated class for the AartiDashbordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-aarti-dashbord',
  templateUrl: 'aarti-dashbord.html',
})
export class AartiDashbordPage {
  tabBarElement: any;
  pageinfoobj: any;
  userID: any;
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
  username: string;
  //private fb: Facebook,
  pages: { MenuName: string; component: string; }[];
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController,private appAvailability: AppAvailability, public navParams: NavParams,public plt: Platform,private iab: InAppBrowser,public user:User,private googlePlus: GooglePlus,public events: Events) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pageinfoobj=navParams.get('item');
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.userID=data
    })
  }
  streaming_Schedul(){
    //userID=178&templeID=105&appid=DARSHANAPP&clientid=CLIENTID6&roleid=DARSHANUSER    
    //const browser = this.iab.create(this.user.IMAGELOCATION+'fb_post/striming_Schedul.php?from=mobileadsapp&appid='+this.user.APPID+'&clientid='+this.user.CLIENTID+'&templeID='+this.pageinfoobj.TempleID+'&userID='+this.userID+'&aarati=aarati&roleid='+this.user.ROLE_ID_TOKEN_KEY, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'fb_post/striming_Schedul.php?from=mobileadsapp&appid='+this.user.APPID+'&clientid='+this.user.CLIENTID+'&templeID='+this.pageinfoobj.TempleID+'&userID='+this.userID+'&aarati=aarati&roleid='+this.user.ROLE_ID_TOKEN_KEY, '_blank', this.options);
    debugger;
    console.log(JSON.stringify(browser));
 
  //   if (this.plt.is('cordova')) {
  //     browser.on('loadstop').subscribe(function (event) {
  //       if(event.url=='https://motleystack.com/fb_post/striming_Schedul.php#close'){
  //           browser.close();
  //       }
  //       //alert();
  //   })
  // }
  }  

  logoutFunction(){
    //this.storage.set('Logintype','Google')
    this.user.gelocaldata('Logintype').then(loginTyperesp=>{
      if(loginTyperesp=='Google'){
        this.googlePlus.logout()
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      }else if(loginTyperesp=='Facebook'){
        // this.fb.logout()
        // .then(res => {
        //   console.log(res);
        // })
        // .catch(err => console.log(err));
      }else{

      }
    })    
    this.user.logout().then(res => {
          
      this.pages = [
        { MenuName: 'Login', component: 'LoginPage' },
        { MenuName: 'Signup', component: 'SignupPage' },
       
      ];
      //this.username='';
      this.username='';
      this.events.publish('menu:created', this.pages, Date.now());
      this.navCtrl.setRoot('LoginPage');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AartiDashbordPage');
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }


  goLiveonFb(){
    if(this.plt.is('android')){
      this.iab.create('android-app://com.facebook.lite', '_system', 'location=yes')
    }else{
      this.launchExternalApp('fb://', 'com.facebook.lite', 'fb://page/', 'https://www.facebook.com/','');
    }
    this.user.send_notification_on_fb_live({templeID:this.pageinfoobj.TempleID})
    //this.launchExternalApp('fb://', 'com.facebook.lite', 'fb://page/', 'https://www.facebook.com/','');
  }
    
 launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
    if (this.plt.is('ios')) {
    console.log("plataforma ios");

      app = iosSchemaName;
    } else if (this.plt.is('android')) {
      app = androidPackageName;
    console.log("plataforma android");

    } else {
      const browser: ThemeableBrowserObject = this.themeableBrowser.create(httpUrl + username, '_blank', this.options);

    //this.iab.create(httpUrl + username, '_system');
    console.log("no es plataforma");
      return;
    }      
    this.appAvailability.check(app).then(
      () => { // success callback
  
       //this.iab.create(appUrl + username, '_system');
       const browser: ThemeableBrowserObject = this.themeableBrowser.create(appUrl + username, '_blank', this.options);
       console.log("abrir app");

        
      },
      (data) => { // error callback

      //this.iab.create(httpUrl + username, '_system');
      const browser: ThemeableBrowserObject = this.themeableBrowser.create(httpUrl + username, '_blank', this.options);
       console.log("ERROR");
       console.log(data);
      }
    );
  }
}

