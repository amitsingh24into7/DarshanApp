import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../providers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the AddedtempledetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-addedtempledetail',
  templateUrl: 'addedtempledetail.html',
})
export class AddedtempledetailPage {
public pageinfoobj:any;
  tabBarElement: any;
  loginInfo: any;
  userID='';
  usermenuobj:{page_type:string,role:string,clientid:string,appid:string,userid:string,templeID:string}={page_type:'admin',role:'',clientid:'',appid:'',userid:'',templeID:''};

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
  usermenu: ArrayBuffer;
  pages: { MenuName: string; component: string; }[];
  username: string;
  //,private fb: Facebook
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController,  private storage: Storage,public user:User, public navParams: NavParams,private iab: InAppBrowser,public plt: Platform,private googlePlus: GooglePlus,public events: Events) {
    this.usermenuobj.clientid=this.user.CLIENTID
    this.usermenuobj.appid=this.user.APPID;
    this.pageinfoobj=navParams.get('item');
debugger;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.userID=data
      this.usermenuobj.userid=data
      this.user.gelocaldata('User_role').then(datares=>{
        this.usermenuobj.role=datares
        this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
          this.usermenuobj.templeID=res
          this.user.get_menu_for_user(this.usermenuobj).subscribe(data=>{
            this.usermenu=data; 
            })
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
    console.log('ionViewDidLoad AddedtempledetailPage');
    this.user.gelocaldata('cartAdmin').then(data=>{
      //console.log(JSON.stringify(data));
      this.loginInfo=data
    })
    //this.storage.get('cartAdmin')
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
  open_ext_Module(url){
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url+'?userid='+this.usermenuobj.userid+'&role='+this.usermenuobj.role+'&templeid='+this.usermenuobj.templeID, '_blank', this.options);
   
    debugger;
    console.log(JSON.stringify(browser));
  }
  streaming_Schedul(){
    //userID=178&templeID=105&appid=DARSHANAPP&clientid=CLIENTID6&roleid=DARSHANUSER    
    //const browser = this.iab.create(this.user.IMAGELOCATION+'fb_post/striming_Schedul.php?from=mobileadsapp&appid='+this.user.APPID+'&clientid='+this.user.CLIENTID+'&templeID='+this.pageinfoobj.TempleID+'&userID='+this.userID+'&roleid='+this.user.ROLE_ID_TOKEN_KEY, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'fb_post/striming_Schedul.php?from=mobileadsapp&appid='+this.user.APPID+'&clientid='+this.user.CLIENTID+'&templeID='+this.pageinfoobj.TempleID+'&userID='+this.userID+'&roleid='+this.user.ROLE_ID_TOKEN_KEY, '_blank', this.options);
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
}

