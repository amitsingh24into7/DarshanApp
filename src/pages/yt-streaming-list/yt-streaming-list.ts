import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../providers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
/**
 * Generated class for the YtStreamingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yt-streaming-list',
  templateUrl: 'yt-streaming-list.html',
})
export class YtStreamingListPage {
  tabBarElement: any;
  userID: any;
  pageinfoobj: any;
  videolistObj:any;

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
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, public navParams: NavParams,public user:User,private iab: InAppBrowser,public plt: Platform) {
    this.pageinfoobj=navParams.get('item');

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    // this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
    //   this.userID=data
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YtStreamingListPage');
  }


  ionViewWillEnter()
  {
    this.user.get_yt_shedule_list({templeID:this.pageinfoobj.TempleID,userID:this.userID}).subscribe(data=>{
      this.videolistObj=JSON.parse(JSON.stringify(data));
    })
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }

  openmodule(itemobj){
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://studio.youtube.com/video/'+itemobj.yt_video_ID+'/livestreaming', '_blank', this.options);
    //const browser = this.iab.create('https://studio.youtube.com/video/'+itemobj.yt_video_ID+'/livestreaming', '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
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


