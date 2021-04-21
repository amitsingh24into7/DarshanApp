import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../providers';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

/**
 * Generated class for the ScheduledStreaminListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scheduled-streamin-list',
  templateUrl: 'scheduled-streamin-list.html',
})
export class ScheduledStreaminListPage {
  tabBarElement: any;
  pageinfoobj: any;
 Scheduledobj:any;
  fbconfig: any;
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

  userID: any;
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, private storage: Storage, public navParams: NavParams,public user:User,  public plt: Platform,public domSanitizer:DomSanitizer) {
    
    //this.imagelocation=user.IMAGELOCATION;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pageinfoobj=navParams.get('item');
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.userID=data
      this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
        if(res){
          this.user.get_fb_strming({templeID:res,userID:this.userID}).subscribe(resp=>{
            debugger;
            this.Scheduledobj=resp;
         
            //this.Scheduledobj=this.domSanitizer.bypassSecurityTrustHtml(tempobjval.fb_resp)
          })
                    
          // this.user.get_all_strming_schedule({templeID:res}).subscribe(resp=>{
          //   //let tempobj=resp.data
          //   this.Scheduledobj=resp.data;
          //   let i=0;
          //   this.Scheduledobj.forEach(element => {
          //     this.Scheduledobj[i].embed_html=this.domSanitizer.bypassSecurityTrustHtml(element.embed_html)
          //     i=i+1;
          //   });
    
          //   debugger
          // })
        }
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
    this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
      if(res){
        this.user.getFacebookConfig({templeID:res}).subscribe(dataobj=>{
          this.fbconfig=dataobj;
        })
      }
    })
    // this.user.getFacebookConfig({templeID:196}).subscribe(dataobj=>{
    //   this.fbconfig=dataobj;
    // })
  }
  getSantizeUrl(url : string) { 


    return this.domSanitizer.bypassSecurityTrustHtml(url)
}


getHref(url){
  let  words = url.split("?");
  // displaying the array
  words[1]= words[1].replaceAll('&width=288" width="288" height="512" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>', "");
  words[1]= words[1].replaceAll('unsafe:href=', "");
  words[1]= words[1].replaceAll('href=', "");
  words[1]= decodeURI(words[1]);
  console.log(words[1]);
  return words[1];
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduledStreaminListPage');
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }

  openFbpage(){
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://www.facebook.com/Ways2Worship-'+this.fbconfig.Fb_page_ID+'/', '_blank', this.options);
    //const browser = this.iab.create('https://www.facebook.com/Ways2Worship-'+this.fbconfig.Fb_page_ID+'/', '_blank', 'location=yes,zoom=yes,enableViewportScale=yes,clearcache=no,toolbar=yes,usewkwebview=yes');
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