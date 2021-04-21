import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../providers';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AppAvailability } from '@ionic-native/app-availability';
import { ThemeableBrowserOptions, ThemeableBrowserObject, ThemeableBrowser } from '@ionic-native/themeable-browser';




/**
 * Generated class for the StreamingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-streaming-list',
  templateUrl: 'streaming-list.html',
})

export class StreamingListPage {
  tabBarElement: any;
  pageinfoobj: any;
  userID: any;
  Scheduledobj:any;
  imagelocation: string;
  fbconfig: ArrayBuffer;
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


  constructor(public navCtrl: NavController,private appAvailability: AppAvailability, public navParams: NavParams,public user:User,private iab: InAppBrowser,public plt: Platform,private themeableBrowser: ThemeableBrowser) {
    this.imagelocation=user.IMAGELOCATION;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pageinfoobj=navParams.get('item');
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.userID=data
      this.user.get_FB_Stream_Scheduled({userID:this.userID,templeID:this.pageinfoobj.TempleID}).subscribe(resp=>{
        this.Scheduledobj=resp;
      })

    })
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"FACEBOOK"
    };    

    this.user.getSearchConfig(servicetypeParmObj).subscribe(dataobj=>{
      this.fbconfig=dataobj;
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StreamingListPage');
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }

  streaming_Schedul(subject,message){
    //userID=178&templeID=105&appid=DARSHANAPP&clientid=CLIENTID6&roleid=DARSHANUSER
let postobj={templeid:this.pageinfoobj.TempleID,userid:this.userID,subject:subject,message:message}
debugger
    this.user.goingToLiveonFB(postobj).subscribe(datarespobj=>{
      console.log(datarespobj);
    })
    // const browser = this.iab.create('https://www.facebook.com/live/producer/upcoming/'+this.fbconfig[3].ConfigVal+'/', '_blank', 'location=yes,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=yes,usewkwebview=yes');
   // debugger;
    //console.log(JSON.stringify(browser));

    

    this.launchExternalApp('fb://', 'com.facebook.orca', 'fb://page/', 'https://www.facebook.com/live/producer/804971270038742', '');
 
  //   if (this.plt.is('cordova')) {
  //     browser.on('loadstop').subscribe(function (event) {
  //       if(event.url=='https://motleystack.com/fb_post/get_all_strming_schedule.php#close'){
  //           browser.close();
  //       }
  //       //alert();
  //   })
  // }
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
        const browser: ThemeableBrowserObject = this.themeableBrowser.create(httpUrl + username, '_blank', this.options);
      //this.iab.create(httpUrl + username, '_system');
       console.log("ERROR");
       console.log(data);


      }
    );
  }
}

