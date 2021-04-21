import { Component } from '@angular/core';
import { ModalPage} from '../modal/modal';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { IonicPage, NavController, NavParams,  Events, ModalController, Platform } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */

 
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  notiCount: any;
  public isadmin=false;

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
  requestobj: { roleid: any, clientid:string,singleTempleID:string, appid:string,lang:string,userid:string,pagetype:string} = {
    singleTempleID:'',
    roleid: '',
    clientid: "",
    appid: "",
    lang:"",
    userid:"",
    pagetype:''
  };
userinfo:{page_type:string,role:string,clientid:string,appid:string,userid:string,templeID:string}={page_type:'setting',role:'',clientid:'',appid:'',userid:'',templeID:''};
  usermenu: any;
          // Our local settings object;
    constructor(public navCtrl: NavController,
      private iab: InAppBrowser,public plt: Platform,
    public navParams: NavParams,
    public events: Events,
    public user:User,
    public qrcodeScanner: QRScanner,
    public modalCtrl: ModalController,
    private themeableBrowser: ThemeableBrowser,
    private storage: Storage
   ) {
     
          //const grt=user.gelocaldata(user.TOKEN_KEY);
                
                    this.userinfo.clientid=this.user.CLIENTID
                    this.userinfo.appid=this.user.APPID;
                    this.user.gelocaldata('User_role').then(datares=>{
                      this.userinfo.role=datares
                     if( datares=='admin' || datares=='superadmin'){
                      this.isadmin=true;
                     }else{
                       this.isadmin=false;
                     }

                    })
                    debugger;
                    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
                      this.userinfo.userid=data;
                      this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
                        this.userinfo.templeID=res
                        this.user.get_menu_for_user(this.userinfo).subscribe(data=>{
                          this.usermenu=data; 
                          })
                        
                      })
                      
                      debugger;
                     
                      this.user.getNotification(this.userinfo).subscribe((data)=>{
                        let tempobj=data;
                      this.notiCount=tempobj.length
                      })

                      
                    })      
   }
        ionViewWillEnter() {
          this.user.get_menu_for_user(this.userinfo).subscribe(data=>{
            this.usermenu=data; 
            })
        }

        
  ngOnChanges() {
    console.log('Ng All Changes');
  }
  openModule(controllername){
    this.navCtrl.push(controllername, {
      item: ''
    });
  }
  open_ext_Module(url){
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url+'?userid='+this.userinfo.userid+'&role='+this.userinfo.role+'&templeid='+this.userinfo.templeID, '_blank', this.options);
   
    debugger;
    console.log(JSON.stringify(browser));
  }
  
  openCommonModule(controllername,pagetype){
    this.requestobj.pagetype=pagetype;
          this.requestobj.appid=this.user.APPID
          this.requestobj.clientid=this.user.CLIENTID
          this.requestobj.roleid=this.user.ROLE_ID_TOKEN_KEY
          this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
            this.requestobj.singleTempleID=res
            this.storage.get(this.user.USER_ID_TOKEN_KEY).then(userid => {
              this.requestobj.userid=userid;
              this.user.get_adsobj(this.requestobj).subscribe(data=>{
                console.log(this.requestobj);
                //data.pgtitle='Event Calendar'
                this.navCtrl.push(controllername, {
                  pagetype: pagetype,pg_content:data,
                });
             })
            })
          })
   
  }
  openmodalpage(){
    let searchModal = this.modalCtrl.create(ModalPage,{'from':'setting'});
    searchModal.onDidDismiss(data => {
      console.log("SEARCH MODEL Dismiss:==",data);
    });
    searchModal.present();
  };
  openSubscribelist(){
    this.navCtrl.push('TemplesPage',{
      subscribelist:'subscribelist'
    })
  }

  qrScanner(){
   // Optionally request the permission early
this.qrcodeScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted
       // start scanning
       var ionApp = document.getElementsByTagName("ion-app")[0];
        // show camera preview
            ionApp.style.display = "none";
            this.qrcodeScanner.show();
           
       let scanSub = this.qrcodeScanner.scan().subscribe((text: string) => {
        setTimeout(() => {
          ionApp.style.display = "block";
          console.log('Scanned something', text);
         alert(text);
         this.qrcodeScanner.hide(); // hide camera preview

         scanSub.unsubscribe(); // stop scanning
        }, 500);
        
         
       });
        
  // wait for user to scan something, then the observable callback will be called

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }

  streaming_Schedul(){
    //userID=178&templeID=105&appid=DARSHANAPP&clientid=CLIENTID6&roleid=DARSHANUSER

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'fb_post/get_all_strming_schedule.php?from=mobileadsapp', '_blank', this.options);
    //const browser = this.iab.create(this.user.IMAGELOCATION+'fb_post/get_all_strming_schedule.php?from=mobileadsapp', '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
    debugger;
    console.log(JSON.stringify(browser));
 
  //   if (this.plt.is('cordova')) {
  //     browser.on('loadstop').subscribe(function (event) {
  //       if(event.url=='https://motleystack.com/fb_post/get_all_strming_schedule.php#close'){
  //           browser.close();
  //       }
  //       //alert();
  //   })
  // }
  } 
}
