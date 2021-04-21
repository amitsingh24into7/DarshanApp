import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { User } from '../../providers';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
//import { Facebook } from '@ionic-native/facebook';
/**
 * Generated class for the ManageTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-template',
  templateUrl: 'manage-template.html',
})

export class ManageTemplatePage {
  pageinfoobj: any;
  tabBarElement: any;
  account:{clientid:string, appid:string, username: string, email: string,userid:string,templeID:string,accessToken:string}={
    clientid: this.user.CLIENTID,
    appid: this.user.APPID,
    username: '',
    email: '',
    userid:'',
    templeID:'',
    accessToken:''
  }

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
  pages: { MenuName: string; component: string; }[];
  username: string;
  //private fb: Facebook,
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser,public user:User,private googlePlus: GooglePlus,private storage: Storage,public plt: Platform ,public events: Events) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
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
         
          // this.user.gelocaldata(this.user.GOOGLE_ACCESS_TOKEN).then(accessToken=>{
          //   debugger;
          //   this.account.accessToken=accessToken;
          //   //this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl();
        
          // })

          })
       
      })
    })
  }
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageTemplatePage');
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
    //const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/insertTemplate.php?from=mobileadsapp&&additionalinfo='+JSON.stringify(this.account), '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no');

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'notificationFile/insertTemplate.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&templeID='+this.account.templeID+'&username='+this.account.username+'&email='+this.account.email+'&userid='+this.account.userid, '_blank', this.options);
    //const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/insertTemplate.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&templeID='+this.account.templeID+'&username='+this.account.username+'&email='+this.account.email+'&userid='+this.account.userid, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
        
    debugger;
    console.log(JSON.stringify(browser));
    if (this.plt.is('cordova')) {
              browser.on('exit').subscribe(function(event) {
              //this.openModule('MyTemplatePage');
              //this.navCtrl.push('MyTemplatePage',{'item':this.pageinfoobj});
          })
          browser.on('loadstop').subscribe(function (event) {
            if(event.url==this.user.IMAGELOCATION+'notificationFile/insertTemplate.php#close'){
                browser.close();
            }
            //alert();
        })
    }
       

  //   browser.on('loadstop').subscribe(function(event) {
    
  //    browser.on('loadstop').subscribe((e)=>{ 
     
  //     browser.show();
  //      this.browser.executeScript("document.getElementById('submit').click()").then(function(result){

  //           alert();
  //         });
  //   });

    
  //  });   
   }

}

