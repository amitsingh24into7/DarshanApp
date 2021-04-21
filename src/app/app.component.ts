import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { FirstRunPage,MainPage } from '../pages';
import { Settings, User} from '../providers';
import { Menu} from '../providers/menu/menu';
import { Storage } from '@ionic/storage';



//import { Storage } from '@ionic/storage';
@Component({
  //selector: 'page-menu',
 // templateUrl: '../pages/menu/menu.html'
 template: `<ion-menu [content]="content" type="overlay">
    <ion-header>
      <ion-toolbar>
      <div *ngIf="username; else other_content">Welcome {{username}}</div>    
       
      <ng-template #other_content>Menu</ng-template>
        <!--<ion-title >{{username}}</ion-title>-->
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-list>
      
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        <ion-icon name="{{p.MenuImage}}"></ion-icon>
          {{p.MenuName}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage :any //FirstRunPage;
  //rootPage ='LoginPage';
  @ViewChild(Nav) nav: Nav;
   username: any;
   
   objLoggedUser: any[]=[];
 pages: any[] = [ ];
  
  account: { roleid: any, clientid:string, appid:string,lang:string} = {
    
    roleid: '',
    clientid: "",
    appid: "",
    lang:''
  };
  menuobj: { roleid: any, clientid:string, appid:string,lang:string} = {
    
    roleid: '',
    clientid: "",
    appid: "",
    lang:''
  };
  //Geocoder configuration
  geoAddress: string;
  
  constructor( private storage: Storage, public menu:Menu, public events: Events, public user: User, private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.user.presentLoadingCustom();
    platform.ready().then( () => {
      this.storage.get('userEmailfotoken').then(res => {        
          console.log("appdata=========",res)
          if(res){     // check islogin
            this.rootPage=MainPage
            this.user.loaderdismiss();
          }else{
            this.rootPage=FirstRunPage
            this.user.loaderdismiss()
          }
        });
        
      this.menuobj.clientid=this.user.CLIENTID;
      this.menuobj.appid=this.user.APPID;
      this.menuobj.roleid = this.user.ROLE_ID_TOKEN_KEY;
      this.user.gelocaldata(this.user.LANG).then(res => {this.menuobj.lang=res});
     
      // this.user.checkToken().then(res => {
      //   if (res) {
      //     this.menu.getmenu(this.menuobj).subscribe((resp) => {
      //       this.events.publish('menu:created', resp, Date.now());
      //       this.username=this.user.USERNAME;
      //     })
      //   }
      // })
    
      let loginDetail= this.user.checkToken()
        if (loginDetail!='') {
          
          this.menu.getmenu(this.menuobj).subscribe((resp) => {
            this.events.publish('menu:created', resp, Date.now());
            this.username=this.user.USERNAME;
          })
        }
        
        this.storage.get('userNamefotoken').then(res => {
          if (res) {
           
            this.user.checkToken()
            this.events.subscribe('username:created', res);
            this.username=res;
            this.user.USERNAME=res;
            
           
            
           }
        });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleDefault();
     
     
       this.splashScreen.hide();
    
      
    });
    events.subscribe('user:created', (user:{user: { ID:any;
      UserID:any;
      UserName:any;
      Password:any;
      RegiseredAddress:any;
      RegisterdPincode:any;
      MailAddress:any;
      MailPinCode:any;
      ContactNumber:any;
      EmailAddress:any;
      Profileimage:any;
      Reporting_To:any;
      facebookid:any;
      gmailID:any;
      CreatedDate:any;
      CreatedBy:any;
      UpdatedDate:any;
      UpdatedBy:any; }}, time: any) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
     
      this.username=user.user.UserName;
      console.log('Welcome', user, 'at', time);
    });
    
    events.subscribe('menu:created', (menu:any[],time: any)=>{
      this.pages=menu;
     // console.log('~~~~~~~~~~~~~+++++++++',JSON.stringify(menu));
     // console.log('~~~~~~~123~~~~~~+++++++++',JSON.stringify(this.pages));
    })
  
    this.pages = [
      { MenuName: 'Login', component: 'LoginPage' },
      { MenuName: 'Signup', component: 'SignupPage' },
     
      
    ];
  
    

    //this.account.roleid = user.gelocaldata(user.ROLE_ID_TOKEN_KEY).then(res => {});
      this.account.clientid='SINGHANIA';
      this.account.appid='ADSAPP';
      this.account.roleid = 'USER';
      this.account.lang=this.user.LANG
    this.initTranslate();
    /*if(this.username){
       this.getmenu(this.pages);
    }*/
   
  }
  
 
 
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log('click fumction',JSON.stringify(page));
    if(page.MenuName=='Logout'){
      this.user.logout().then(res => {
          
        this.pages = [
          { MenuName: 'Login', component: 'LoginPage' },
          { MenuName: 'Signup', component: 'SignupPage' },
         
        ];
        //this.username='';
        this.username='';
        this.events.publish('menu:created', this.pages, Date.now());
        this.nav.setRoot(page.component);
      });
      
    }else{
      this.nav.setRoot(page.component,{page});
    }
   
  }
 
}
