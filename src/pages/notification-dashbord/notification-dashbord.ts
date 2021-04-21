import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GooglePlus } from '@ionic-native/google-plus';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { SocialAuthService } from 'angularx-social-login';
//import { Facebook } from '@ionic-native/facebook';
/**
 * Generated class for the NotificationDashbordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-notification-dashbord',
  templateUrl: 'notification-dashbord.html',
})
export class NotificationDashbordPage {
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
pages: any[] = [ ];
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
  account:{clientid:string, appid:string, username: string, email: string,userid:string,templeid:string,accessToken:string}={
    clientid: this.user.CLIENTID,
    appid: this.user.APPID,
    username: '',
    email: '',
    userid:'',
    templeid:'',
    accessToken:''
  }
  navParamsObj: any;
  username: string;
  //private fb: Facebook,
  constructor(private themeableBrowser: ThemeableBrowser,  public events: Events,  public navCtrl: NavController, public navParams: NavParams,public user:User, private iab: InAppBrowser,private googlePlus: GooglePlus,private storage: Storage,public plt: Platform,private socialAuthService: SocialAuthService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pageinfoobj=navParams.get('item');
    
    console.log(this.pageinfoobj);
    user.gelocaldata(user.EMAIL_TOKEN_KEY).then(res => {
      this.account.email=res; 
      debugger; 
      this.account.templeid=this.pageinfoobj.TempleID;  
      user.gelocaldata(user.TOKEN_KEY).then(res => {
        this.account.username=res; 
       
        user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(res =>{
          this.account.userid=res; 
          // this.user.gelocaldata(this.user.GOOGLE_ACCESS_TOKEN).then(accessToken=>{
          //   debugger;
          //   this.account.accessToken=accessToken;
          //   //this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl();

           
        
          // })  
          if (this.plt.is('ios') || this.plt.is('android')) {
          this.googlePlus.trySilentLogin({'scopes': 'https://www.googleapis.com/auth/drive.file', 'offline': true})
          .then(res =>{ 
            this.storage.set(this.user.GOOGLE_ACCESS_TOKEN,res.accessToken);
            
            this.account.accessToken=res.accessToken;})
          .catch(err => {console.log(err)});
         }else{
          this.user.gelocaldata(this.user.GOOGLE_ACCESS_TOKEN).then(accessToken=>{
            this.account.accessToken=accessToken
          })
          
         }
        
        })
        
       
      })
    })

   
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
    console.log('ionViewDidLoad NotificationDashbordPage');
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
  openSendNotification(){
    this.navParamsObj=this.navParams.get('item');
          this.account.templeid=this.navParamsObj.TempleID
         debugger; 
    //const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/send_notification.php?from=mobileadsapp&additionalinfo='+JSON.stringify(this.account), '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');

    //const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'notificationFile/send_notification.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&email='+this.account.email+'&templeid='+this.account.templeid+'&userid='+this.account.userid+'&username='+this.account.username, '_blank', this.options);

    const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/send_notification.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&email='+this.account.email+'&templeid='+this.account.templeid+'&userid='+this.account.userid+'&username='+this.account.username, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');


    debugger;
    if (this.plt.is('cordova')) {
    browser.on('loadstop').subscribe(function (event) {
      if(event.url=='https://motleystack.com/notificationFile/send_notification.php#close'){
          browser.close();
      }
      //alert();
  })
}
  }   
}
