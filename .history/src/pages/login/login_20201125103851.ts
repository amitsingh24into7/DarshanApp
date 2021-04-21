import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,   ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { User } from '../../providers';
import { Storage } from '@ionic/storage';
import { ModalPage} from '../modal/modal';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MainPage } from '../';
import { Menu} from '../../providers/menu/menu';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from 'ionic-angular';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ToastController } from 'ionic-angular';

import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { YoutubechainalPage } from '../youtubechainal/youtubechainal';
import { AppVersion } from '@ionic-native/app-version';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
//   googlelogin:{accessToken:string,expires:string,expires_in:string,email:string,userId:string,displayName:string,familyName:string,givenName:string}={
//     accessToken:'',
//     expires:'',
//     expires_in:'',
//     email:'',
//     userId:'',
//     displayName:'',
//     familyName:'',
//     givenName:''

// };
google_FB_account: { username: string, email: string,userid:string, password: string, appid: string,clientid:string, DeviceID: any ,facebookid:string,gmailID:string,authtoken:string,provider:string,Profileimage:string,app_version:any } = {
            username: '',
            email: '',
            userid:'',
            password: '',
            appid:'',
            clientid:'',
            DeviceID:'',
            facebookid:'',
            gmailID:'',
            authtoken:'',
            provider:'',
           
            Profileimage:'',
             app_version:''       
            };
 
            // {accessToken:'',
            // expires:'',
            // expires_in:'',
            // email:'',
            // userId:'',
            // displayName:'',
            // familyName:'',
            // givenName:'',
            // imageUrl:''}

  account: { userid: string, password: string, clientid:string, appid:string,lang:string,provider:string,DeviceID:string,authtoken:string} = {
    userid: '',
    password: '',
    clientid: "",
    appid: "",
    lang:'',
    provider:'',
    DeviceID:'',
    authtoken:''
  };
  

  
  menuobj: { roleid: any, clientid:string, appid:string,lang:string} = {
    
    roleid: '',
    clientid: "",
    appid: "",
    lang:""
  };
  // Our translated text strings
  //private loginErrorString: string;
  objLoggedUser: any;
  tabBarElement: any;

  constructor(public navCtrl: NavController,public events: Events,private socialAuthService: SocialAuthService,
    public user: User,
    public menu:Menu,
    public appVersion:AppVersion,
    //private alertCtrl: AlertController,
    private storage: Storage,
   // private iab: InAppBrowser,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    //private fb: Facebook,    
    private push: Push,
    public platform:Platform,
    private googlePlus: GooglePlus,
    public translateService: TranslateService) {      


      
      this.account.appid=user.APPID;
      this.account.clientid=user.CLIENTID;
      this.account.lang=this.user.LANG;
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      this.google_FB_account.appid=user.APPID;
      this.google_FB_account.clientid=user.CLIENTID;
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
     // this.loginErrorString = value;      
      //this.account.roleid = user.gelocaldata(user.ROLE_ID_TOKEN_KEY);
      this.menuobj.clientid=this.user.CLIENTID;;
      this.menuobj.appid=this.user.APPID;

      this.menuobj.roleid = this.user.ROLE_ID_TOKEN_KEY;
      this.user.gelocaldata(this.user.LANG).then(res => {this.menuobj.lang=res});;
      
    })
    if ((this.platform.is('cordova')) && (this.platform.is('ios') || this.platform.is('android'))) {
        this.pushfunction();
    }
    this.checklogin();
    
  }
  // Attempt to login in through our User service
  //checklogin():any;

  ionViewWillEnter()
  {
    if(this.tabBarElement){
      this.tabBarElement.style.display = 'none';
    }
    //this.presentPrompt();

  }


  ionViewWillLeave()
  {
    if(this.tabBarElement){
      this.tabBarElement.style.display =null;
    }
  }  
  pushfunction(){
    //debugger;
    this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
     }).then(() => console.log('Channel created'));     
     // Delete a channel (Android O and above)
     this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
     
     // Return a list of currently configured channels
     this.push.listChannels().then((channels) => console.log('List of channels', channels))
     
     // to initialize push notifications
     const options: PushOptions = {
      android: {},
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
      
   pushObject.on('notification').subscribe((notification: any) =>{ 
    // debugger;
     console.log('Received a notification', notification);
   
      this.navCtrl.push("NotificationPage");
   
  
  });
   
  
   pushObject.on('registration').subscribe((registration: any) =>{
    
      console.log('Device registered', registration); 
      console.log('Device registered registrationId', registration.registrationId); 
      this.storage.set('registrationId',registration.registrationId); 
      this.account.DeviceID= registration.registrationId;   
    });  
    
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  checklogin(){
    //debugger;
    // if(this.user.checkToken()){
    //   //this.getmenu();
    //   this.navCtrl.push(MainPage);
    // }

    this.storage.get('userNamefotoken').then(res => {
      if (res) {

        this.user.checkToken()
        this.events.subscribe('username:created', res);
        
        this.user.USERNAME=res;
        this.getmenu();
        this.navCtrl.setRoot(MainPage);
        // this.storage.get('islogincounter').then(data => { //--------language isset
        //         if(data==null){
        //           let searchModal = this.modalCtrl.create(ModalPage);
        //             searchModal.onDidDismiss(data => {
        //               console.log("SEARCH MODEL Dismiss:==",data);
        //             });
        //             searchModal.present();
        //             //return;
        //         }else{
        //           this.navCtrl.setRoot(MainPage);
        //         }
        //     console.log('-------islogincounter--------',res)
        // })
               
        
       }
    });
    
  }
  loginfromgoogle(){
    if (this.platform.is('ios') || this.platform.is('android')) {
         

    console.log("Calling  goole login API SUCESS");
    //debugger;  
    this.googlePlus.login({'scopes': 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/youtube', 'offline': true})
  .then(res => {
    this.storage.set('Logintype','Google')
          console.log("login into google SUCESS",res);
          this.google_FB_account.provider="Google";          
          this.google_FB_account.username=res.displayName;
          this.google_FB_account.gmailID=res.userId;
          this.google_FB_account.email=res.email;
          this.google_FB_account.userid=res.email;
          this.google_FB_account.authtoken=res.accessToken;
          this.storage.set(this.user.GOOGLE_ACCESS_TOKEN,res.accessToken);
          this.google_FB_account.Profileimage=res.imageUrl;                  
          this.user.gelocaldata("registrationId").then(data=>{
            this.google_FB_account.DeviceID=data;
            console.log("calling API with ",this.google_FB_account);
        

          this.appVersion.getVersionCode().then(value => {
            this.google_FB_account.app_version=value;
            this.user.signup(this.google_FB_account).subscribe((resp) => {
              //this.navCtrl.push(MainPage);
              console.log(" API Reap (signup from g+)  ",resp);
              this.account.provider="Google";
              this.account.userid=this.google_FB_account.email;
              this.doLogin();
            }, (err) => {      
              this.navCtrl.push(MainPage);
        
              // Unable to sign up
              // let toast = this.toastCtrl.create({
              //   message: "google account not validate",
              //   duration: 3000,
              //   position: 'top'
              // });
              // toast.present();
            });
           }).catch(err => {
              console.log("app version:----",err)
            // alert(err);
           });
          });                   
  })
  .catch(err => console.log('Error logging into google',err)); 
      }else{
        debugger;
       
        this.socialSignIn()
      }
  }  

  
  socialSignIn() {
    debugger;  ////-------------------Use for web login
    let socialPlatformProvider;
    
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
 
    let scopes='https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/drive.file'
    this.socialAuthService.signIn(socialPlatformProvider,{ 'scope': scopes}).then(
      (user) => {  
        let userobj=user    	
        console.log(" sign in data : " , user);
        this.storage.set('Logintype','Google')
          //console.log("login into google SUCESS",res);
          this.google_FB_account.provider="Google";          
          this.google_FB_account.username=userobj.name;
          this.google_FB_account.gmailID=userobj.id;
          this.google_FB_account.email=userobj.email;
          this.google_FB_account.userid=userobj.email;
          this.google_FB_account.authtoken=userobj.authToken;
          this.storage.set(this.user.GOOGLE_ACCESS_TOKEN,userobj.authToken);
          this.google_FB_account.Profileimage=userobj.photoUrl;                  
          this.user.gelocaldata("registrationId").then(data=>{
            this.google_FB_account.DeviceID=data;
            console.log("calling API with ",this.google_FB_account);
          this.user.signup(this.google_FB_account).subscribe((resp) => {
            //this.navCtrl.push(MainPage);
            console.log(" API Reap (signup from g+)  ",resp);
            this.account.provider="Google";
            this.account.authtoken=this.google_FB_account.authtoken
            this.account.userid=this.google_FB_account.email;
            this.doLogin();
          }, (err) => {      
            this.navCtrl.push(MainPage);
      
            // Unable to sign up
            // let toast = this.toastCtrl.create({
            //   message: "google account not validate",
            //   duration: 3000,
            //   position: 'top'
            // });
            // toast.present();
          });
          }); 
            
      },err => {
        console.log(err);
     }
      
    );
  }

  /*loginfromfacebook(){
    this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) => {
      //debugger;
      // The connection was successful
      if(res.status == "connected") {
        this.storage.set('Logintype','Facebook')
        this.google_FB_account.provider="Facebook";          
        
        this.google_FB_account.facebookid=res.authResponse.userID;
       
        this.google_FB_account.authtoken=res.authResponse.accessToken;
        this.storage.set(this.user.GOOGLE_ACCESS_TOKEN,res.authResponse.accessToken);
        this.storage.get('registrationId').then(data=>{
          this.google_FB_account.DeviceID=data;
          // Get user ID and Token
          //var fb_id = res.authResponse.userID;
          //var fb_token = res.authResponse.accessToken;
          // Get user infos from the API
          this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {
            // Get the connected user details
            var gender    = user.gender;
            var birthday  = user.birthday;
            var name      = user.name;
            var email     = user.email;
            this.google_FB_account.email=user.email;
            this.google_FB_account.userid=user.email;
            this.google_FB_account.username=user.name;
            
            //this.google_FB_account.Profileimage=res.imageUrl;
            console.log("=== USER INFOS ===");
            console.log("Gender : " + gender);
            console.log("Birthday : " + birthday);
            console.log("Name : " + name);
            console.log("Email : " + email);
            this.user.signup(this.google_FB_account).subscribe((resp) => {
              //this.navCtrl.push(MainPage);
              console.log(" API Reap (signup from Facebook)  ",resp);
              this.account.provider="Facebook";
              this.account.userid=this.google_FB_account.email;
              this.doLogin();
            }, (err) => {      
              this.navCtrl.push(MainPage);
        
              // Unable to sign up
              // let toast = this.toastCtrl.create({
              //   message: "Facebook account not validate",
              //   duration: 3000,
              //   position: 'top'
              // });
              // toast.present();
            });
            // => Open user session and redirect to the next page
        })
        })
          
        }
          
            console.log('Logged into Facebook!', res);
          })
  .catch(e => console.log('Error logging into Facebook', e));
  }*/
  
  doLogin() {
    //debugger;
    this.user.login(this.account).subscribe((resp) => {
     if(resp.status!='fail'){
       debugger
        this.events.publish('user:created', resp, Date.now());
        this.getmenu();
                this.storage.get('islogincounter').then(data => { //--------language isset
                  this.user.add_Self_recordin_MyFamily(resp);
                  if(data==null){
                    let searchModal = this.modalCtrl.create(ModalPage);
                      searchModal.onDidDismiss(data => {
                        console.log("SEARCH MODEL Dismiss:==",data);
                        if(data.length>0){

                          this.presentPrompt()

                        }else{
                          this.navCtrl.setRoot(MainPage);
                        }
                      });
                      searchModal.present();
                      
                  }else{
                    debugger
                    this.storage.set(this.user.USER_ID_TOKEN_KEY,resp.user.ID);
                    this.navCtrl.setRoot(MainPage);
                  }
                      })
      //this.navCtrl.push(MainPage);
      }else{
        let toast = this.toastCtrl.create({
          message: resp.message,
          duration: 5000,
          position: 'top'
        });
        toast.present();
      }
      
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      // let toast = this.toastCtrl.create({
      //   message: this.loginErrorString,
      //   duration: 5000,
      //   position: 'top'
      // });
      // toast.present();
    });
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

    // let alert = this.alertCtrl.create({
    //   title: 'Please Enter Temple ID',
    //   inputs: [
    //     {
    //       name: 'templeid',
    //       placeholder: 'Temple ID'
    //     },
        
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: data => {
    //         this.navCtrl.setRoot(MainPage);
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Ok',
    //       handler: data => {
    //         if (data.templeid) {
    //           this.storage.set(this.user.SINGAL_TEMPLE_ID,data.templeid);

    //           this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(datares=>{
    //             let tempuserobj:{userid:string,templeid:string,action:string}={
    //               userid:datares,
    //               templeid:data.templeid,    
    //               action:'s'  
    //                } 
    //                debugger;        
    //                 this.user.scribedfunction(tempuserobj).subscribe((data:any)=>{  
    //                   this.navCtrl.setRoot(MainPage);
    //                  })
    //               })
              
             
    //         } else {
    //           //this.navCtrl.setRoot(MainPage);
    //           return false;
    //         }
           
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }
  
  getmenu() {
    
    this.menu.getmenu(this.menuobj).subscribe((resp) => {
      //this.pp=resp;
     //Object.keys(resp).forEach(function(key,index) { 
        // key: the name of the object key
         // index: the ordinal position of the key within the object 
         this.events.publish('menu:created', resp, Date.now());
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
  }
  signupfrom(){
    this.navCtrl.push('SignupPage');
  }
}
