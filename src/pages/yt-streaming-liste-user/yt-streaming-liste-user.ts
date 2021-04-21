import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { User } from '../../providers';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
/**
 * Generated class for the YtStreamingListeUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yt-streaming-liste-user',
  templateUrl: 'yt-streaming-liste-user.html',
})
export class YtStreamingListeUserPage {
  tabBarElement: any;
  videolistObj: any;
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
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, public navParams: NavParams,public plt: Platform,public user:User) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YtStreamingListeUserPage');
  }
  
  ionViewWillEnter()
  {
    this.user.gelocaldata(this.user.SINGAL_TEMPLE_ID).then(data=>{
     // let respobj=data;
      this.user.get_yt_shedule_list({templeID:''}).subscribe(data=>{
        this.videolistObj=JSON.parse(JSON.stringify(data));
      })
    })
      this.tabBarElement.style.display = 'none';
  }


  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  openmodule(itemobj){
    //

    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://youtu.be/'+itemobj.yt_video_ID, '_blank', this.options);
    //const browser = this.iab.create('https://youtu.be/'+itemobj.yt_video_ID, '_blank', 'location=yes,zoom=no,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
    debugger;
    console.log(JSON.stringify(browser));
 
  }



  
  
}
