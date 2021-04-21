import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../providers';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook } from '@ionic-native/facebook';
/**
 * Generated class for the ReportDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-dashboard',
  templateUrl: 'report-dashboard.html',
})
export class ReportDashboardPage {
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


  pageinfoobj: any;
  tabBarElement: any;
  menuobj: ArrayBuffer;
  accountinfoobj:{appid:string,roleid:string,userid:string,templeid:string}={appid:"",roleid:"",userid:"",templeid:''}
  pages: { MenuName: string; component: string; }[];
  username: string;
  //private fb: Facebook,
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, public navParams: NavParams,public user:User,private iab: InAppBrowser,public plt: Platform,private googlePlus: GooglePlus,public events: Events) {
    this.pageinfoobj=navParams.get('item');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.user.getreport_Menu('').subscribe(resp=>{
      this.menuobj=resp;
    })
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.accountinfoobj.userid=resp;
      this.accountinfoobj.appid=this.user.APPID;
      this.accountinfoobj.roleid=this.user.ROLE_ID_TOKEN_KEY;
      this.accountinfoobj.templeid=this.pageinfoobj.TempleID;
      
    })

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportDashboardPage');
  }
  openModule(componentName:any){
    debugger;
    this.navCtrl.push(componentName,{'item':this.pageinfoobj});
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
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


  
  openIappBrowser(urlobj){
    debugger;
   
 
   
      // const browser = this.iab.create(urlobj.MenuURL+'?additional_info='+JSON.stringify(this.accountinfoobj),'_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no');
      const browser: ThemeableBrowserObject = this.themeableBrowser.create(urlobj.MenuURL+'?appid='+this.accountinfoobj.appid+'&templeid='+this.accountinfoobj.templeid+'&userid='+this.accountinfoobj.userid+'&roleid='+this.accountinfoobj.roleid, '_blank', this.options);
     
      // const browser = this.iab.create(urlobj.MenuURL+'?appid='+this.accountinfoobj.appid+'&templeid='+this.accountinfoobj.templeid+'&userid='+this.accountinfoobj.userid+'&roleid='+this.accountinfoobj.roleid,'_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
     
      debugger;
      
      console.log(JSON.stringify(browser));
  //      if (this.plt.is('cordova')) {
  //     browser.on('loadstop').subscribe(function (event) {
  //       if(event.url==urlobj.MenuURL+'#close'){
  //           browser.close();
  //       }
  //       //alert();
  //   })
  // }
  // else{
  //   window.open(urlobj.MenuURL+'?appid='+this.accountinfoobj.appid+'&templeid='+this.accountinfoobj.templeid+'&userid='+this.accountinfoobj.userid+'&roleid='+this.accountinfoobj.roleid,'_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no');
  // }
   
   }
  
}

