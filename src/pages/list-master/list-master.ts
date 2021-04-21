import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, MenuController, Platform, Nav, NavParams, AlertController } from 'ionic-angular';
import{User} from '../../providers/user/user' 
import { Item } from '../../models/item';
import { Items } from '../../providers';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { FirstRunPage } from '../../pages';
import { Menu} from '../../providers/menu/menu';
import { Storage } from '@ionic/storage';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
//import {ProviderPhotoProvider} from '../../providers/provider-photo/provider-photo'
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubechainalPage } from '../youtubechainal/youtubechainal';

//import { AppUpdate } from '@ionic-native/app-update';


//import { HttpClient } from '@angular/common/http';
//import{MycartPage} from'../pages/mycart/mycart'
export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  @ViewChild(Nav) nav: Nav;
  rootPage = FirstRunPage;
  menuobj: { roleid: any, clientid:string,singleTempleID:string, appid:string,lang:string,userid:string,pagetype:string} = {
    singleTempleID:'',
    roleid: '',
    clientid: "",
    appid: "",
    lang:"",
    userid:"",
    pagetype:''
  };
  public currentItems: Item[];
  public app_v_of_user:any
  public recentActivityoflist:Item[];
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  username: any;
  imagelocation:string='';
  geoAddress: any;
  public viewContent:any;
  public viewFile:string;
   
public notiCount:any;
public MyTemples:any;
public TempleEvents:any;
public ServiceType:any;
public singelTemple:string;
  getpopulartemples: ArrayBuffer;
  ads_list_obj: any;

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
  
  constructor(public user: User,
    private themeableBrowser: ThemeableBrowser,
    public menucontroller: MenuController,
    translate: TranslateService,
    public menu:Menu,
    private alertCtrl: AlertController,
    public plt: Platform,
    //private appVersion: AppVersion,
    //private appUpdate: AppUpdate,
    private storage: Storage,
    public navParams: NavParams,
    //private http: HttpClient,
    public iab:InAppBrowser,
    public platform: Platform,
   public appVersion:AppVersion,
              public navCtrl: NavController,              
              public items: Items, public events: Events,
              public modalCtrl: ModalController) {
              debugger;              
              // this.storage.get("recentActivity").then(data=>{
              //   this.recentActivityoflist=data;
              //   debugger;
              //   console.log(JSON.stringify(this.recentActivityoflist));
              // })
              this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
                if(res){
                  this.singelTemple=res
                }else{
                  this.presentPrompt();
                }                               
              })
              //this.user.gelocaldata(this.user.SINGAL_TEMPLE_ID).then(res => {this.singelTemple=res});
                
              
              this.user.presentLoadingCustom();

                this.checklogin();
                  this.imagelocation=user.IMAGELOCATION;
                  //debugger;
                  
                  this.currentItems = this.items.query();
                  this.dir = platform.dir();
                   this.user.getgeolocation().then(res => {
                    this.geoAddress=res;
                   });

                    this.menuobj.clientid=this.user.CLIENTID;
                    this.menuobj.appid=this.user.APPID;
                    this.menuobj.roleid = this.user.ROLE_ID_TOKEN_KEY;
                    this.menuobj.singleTempleID=this.singelTemple;
                    this.user.gelocaldata(this.user.LANG).then(res => {
                      if(res=='Eng'){
                        storage.set(this.user.LANG,'English');
                        this.menuobj.lang='English';
                      }else{
                        this.menuobj.lang=res
                      }
                      
                    });                   
                     
                    let getService:{clientid:string,appid:string,userid:string,language:string,singleTempleID:string}={clientid:'',appid:'',userid:'',language:'',singleTempleID:''}
                    this.storage.get(this.user.USER_ID_TOKEN_KEY).then(userid=>{
                      getService.clientid=this.user.CLIENTID;
                      getService.appid=this.user.APPID;
                      getService.userid=userid;
                      getService.language=this.menuobj.lang
                      getService.singleTempleID=this.singelTemple;
                     
                     
                      this.user.getServiceTypeDashboard(getService).subscribe((data)=>{

                        this.ServiceType=data;
                        this.user.loaderdismiss();

                      });                      

                      this.user.getMyTemplesDashboard(getService).subscribe((data)=>{
                        debugger
                        this.MyTemples=data;
                      });
                      this.user.getTempleseventDashboard(getService).subscribe((data)=>{
                        this.TempleEvents=data;
                      });
                      this.user.getpopulartemples(getService).subscribe((data)=>{
                        this.getpopulartemples=data;
                      });
                      

                    })
                    
                    let userinfo:{clientid:string,appid:string,userid:string,singleTempleID:string}={clientid:'',appid:'',userid:'',singleTempleID:''};
                   
                    userinfo.clientid=this.user.CLIENTID
                    userinfo.appid=this.user.APPID;
                    userinfo.singleTempleID=this.singelTemple;
                    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
                     // debugger;
                      userinfo.userid=data;
                      this.storage.get(this.user.SINGAL_TEMPLE_ID).then(singelTemple => {
                        this.singelTemple=singelTemple
                        userinfo.singleTempleID=singelTemple
                        this.user.getNotification(userinfo).subscribe((data)=>{
                          let tempobj=data;
                        this.notiCount=tempobj.length
                        })
                      })
                     
                    })                  
                  
                } 

  openModule(moduleName:any){
    debugger;
      if(moduleName=='NotificationPage'){
        this.notiCount=null;
      }
      if(moduleName=='Service'){
        this.navCtrl.push('ItemDetailPage', {
          item: 'SingalTemple'
        });
      }else if(moduleName=='ScheduledStreaminListPage'){
        this.openfb_video();
      }
      else{
        this.navCtrl.push(moduleName, {
        item: ''
      });
      }
    
    // this.navCtrl.setRoot(moduleName, {
    //   item: ''
    // });
  }
  

  openModuleslider( moduleName:any,data){
    
    this.navCtrl.push(moduleName, {
      item: data
    });
  }
    
  checklogin(){
  
    // if(this.user.checkToken()){
    //   //this.getmenu();
    //   this.navCtrl.push(MainPage);
    // }
    
    //this.nav.setRoot
    this.storage.get('userNamefotoken').then(res => {
      if (res) {
        this.user.checkToken()
        this.events.subscribe('username:created', res);        

        this.user.USERNAME=res;
        this.getmenu();
       //this.navCtrl.push(MainPage);        
       }else{
        //this.nav.setRoot('LoginPage');  
        this.navCtrl.setRoot('LoginPage');
       }
    });    
  }

  getmenu() {
    this.storage.get(this.user.USER_ID_TOKEN_KEY).then(userid=>{
      this.menuobj.userid=userid;
      this.menu.getmenu(this.menuobj).subscribe((resp) => {
        //this.pp=resp;
       //Object.keys(resp).forEach(function(key,index) { 
          // key: the name of the object key
           // index: the ordinal position of the key within the object 
          // alert('jljlk');
           this.app_v_of_user=resp.app_v;
           debugger;
           
           this.appVersion.getVersionCode().then(value => {
            // this.VersionCode = value;
           // alert(JSON.stringify(this.app_v_of_user))
            if(Number(value)<Number(this.app_v_of_user[0].new_app_version)){
                  this.presentConfirm();
                 }
              //    else if(Number(value)>=Number(this.app_v_of_user[0].new_app_version)){
              //    this.user.update_user_app_version({userid:this.menuobj.userid,current_v:value});
              // }
            
           }).catch(err => {
            console.log("app version:----",err)
           });

          //  this.appVersion.getVersionNumber().then(value => {
          //    if(value==this.app_v_of_user.new_app_version){
          //     this.presentConfirm();
          //    }
          //     alert(JSON.stringify(this.app_v_of_user))
          //    alert(value);
          //  }).catch(err => {
       
          
          //    alert(err);
          //  });


           this.events.publish('menu:created', resp.menu, Date.now());
          // pages.push(resp[index]);
          // console.log(JSON.stringify(pages));
        //});
        //pages
        /*if(resp.status=='success'){*/
          //this.events.publish('menu:created', resp, Date.now());S
        
        /*}else{
          
        }*/
        
      }, (err) => {
        //this.navCtrl.push(MainPage);
        // Unable to log in
        /*let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 5000,
          position: 'top'
        });
        toast.present();*/
      });
    })
   
  }


  
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Message',
      message: 'There is New version available of the app avilable , Please update',
      cssClass:'updateconfarmatio',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            if (this.platform.is('android')) {
              this.iab.create('https://play.google.com/store/apps/details?id=com.darshanapp.cname', '_system', 'location=yes');
          }
          }
        }
      ]
    });
    alert.present();
  }




  openfb_video(){
    debugger;
    //const browser: ThemeableBrowserObject;
     this.themeableBrowser.create(this.user.IMAGELOCATION+'notificationFile/get_live_vodeo_iframe.php?from=mobileadsapp&templeID='+this.singelTemple+'&userid='+this.menuobj.userid,'_blank', this.options);
     
    // const browser = this.iab.create(this.user.IMAGELOCATION+'notificationFile/get_live_vodeo_iframe.php?from=mobileadsapp&templeID='+this.singelTemple+'&userid='+this.menuobj.userid, '_blank', 'location=yes,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=nousewkwebview=yes');
         
    //   if (this.plt.is('cordova')) {
    //   browser.on('loadstop').subscribe(function (event) {
    //     if(event.url=='https://adzmantra.in/notificationFile/get_live_vodeo_iframe.php#close'){
    //         browser.close();
    //     } 
    //   })
    // }
  }
openmyCart(){
  this.navCtrl.push('MycartPage', {
    item: ''
  });
}
// openmyCartlist(){
//   this.navCtrl.push('CartListPage', {
//     item: ''
//   });
// }
  /**
   * The view loaded, let's query our items for the list
   
  ionViewDidLoad() {
    
  }
*/


  
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }
  
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      //item: item
    });
  }

/**
 * Below  Slider related method. 
 */
doRefresh(event) {
  console.log('Begin async operation');
 
  setTimeout(() => {
    console.log('Async operation has ended');
    this.events.publish('currentItems:created', this.items.doref(), Date.now());
    
    //this.items.doref();
    // this.storage.get("recentActivity").then(data=>{
      
    //   //this.events.subscribe('recentActivity:created', data);
    //   this.recentActivityoflist=data;
    //   console.log("data",data);
    //   console.log("recentActivity",this.recentActivityoflist);

    // })
    if(this.user.recentActivity.length>0){
      this.recentActivityoflist=this.user.recentActivity;
    }
    
    
    event.complete();
  }, 2000);
}
startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }
  presentPrompt() {
    debugger;
    let searchModal = this.modalCtrl.create(YoutubechainalPage);
    searchModal.onDidDismiss(data => {
      debugger;
      console.log("MODEL Dismiss:==",data);
      if(data.issubscribe){
        this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(datares=>{
          let userobjinfo:{userid:string,templeid:string,authtoken:string}={
            userid:datares,
            templeid:data.templeid,    
            authtoken:this.account.authtoken  
             }
          this.user.youtubeSubscribe(userobjinfo);
        })
      
      }
      if (data.templeid) {
                  this.storage.set(this.user.SINGAL_TEMPLE_ID,data.templeid);
    
                  this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(datares=>{
                    let tempuserobj:{userid:string,templeid:string,action:string}={
                      userid:datares,
                      templeid:data.templeid,    
                      action:'s'  
                       } 
                       debugger;        
                        this.user.scribedfunction(tempuserobj).subscribe((data:any)=>{  
                          this.navCtrl.setRoot(MainPage);
                         })
                      })
                  
                } else {
                  this.navCtrl.setRoot(MainPage);
                  return false;
                }
    });
    searchModal.present();
    
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    //const updateUrl = this.user.api.url+'/Check_version.XML';
    // this.appUpdate.checkAppUpdate(updateUrl).then(update => {
    
    // }).catch(error=>{
     
    // });      

    this.menuobj.pagetype='ads';
    this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
      
      this.menuobj.singleTempleID=this.singelTemple=res;
      this.storage.get(this.user.USER_ID_TOKEN_KEY).then(res => {
        this.menuobj.userid=res;
        this.user.get_adsobj(this.menuobj).subscribe(data=>{
          this.ads_list_obj=data;
        })
      })
    }) 
     
    this.menucontroller.enable(false);
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    //this.menucontroller.enable(true);
  }
  openmodulevideo(modle){
    this.navCtrl.push(modle);
  }

  opencommanPage(urlsrting,adsID){
    urlsrting=urlsrting+'?userID='+this.menuobj.userid+'&templeID='+this.menuobj.singleTempleID+'&adsID='+adsID
    this.navCtrl.push('CommonPage', {adsurl:urlsrting});
  }

}
