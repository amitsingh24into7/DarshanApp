import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers';
import { MainPage } from '../';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Push, PushOptions, PushObject } from '@ionic-native/push';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})


export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, email: string,userid:string, password: string, appid: string,clientid:string, DeviceID: string } = {
    username: '',
    email: '',
    userid:'',
    password: '',
    appid:'',
    clientid:'',
    DeviceID:''
  };
  
  
  // Our translated text strings
  //private signupErrorString: string;

  constructor(public navCtrl: NavController,
      //private uniqueDeviceID: UniqueDeviceID,
      public user: User,
      private storage: Storage,
      private push: Push,
      private platform: Platform,
      public translateService: TranslateService) {
              this.account.appid=user.APPID;
              this.account.clientid=user.CLIENTID;
              this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
                //this.signupErrorString = value;
            })
            /**
       *    Unique DeviceID block
       * 
       */
      if (this.platform.is('cordova')) {
        this.pushfunction()
      }
      
      // debugger;
      // this.uniqueDeviceID.get()
      // .then((uuid: any) => this.account.DeviceID=uuid)
      // .catch((error: any) => console.log('Unique DeviceID block error ',error));
    /**
     * End Unique DeviceID block
     */
    
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


  doSignup() {
    this.account.userid=this.account.email;
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      // let toast = this.toastCtrl.create({
      //   message: this.signupErrorString,
      //   duration: 3000,
      //   position: 'top'
      // });
      // toast.present();
    });
  }
}

