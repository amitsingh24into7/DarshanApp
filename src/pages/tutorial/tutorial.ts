import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform, Events} from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { User } from '../../providers';
import { MainPage } from '../';
import { Menu} from '../../providers/menu/menu';
export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  username: any;
  menuobj: { roleid: any, clientid:string, appid:string} = {
    
    roleid: '',
    clientid: "",
    appid: ""
  };
  constructor( public listmenu:Menu,public events: Events,public navCtrl: NavController,public user: User, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
    this.menuobj.clientid=this.user.CLIENTID;
    this.menuobj.appid=this.user.APPID;
    this.menuobj.roleid = this.user.ROLE_ID_TOKEN_KEY;
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
      });
      this.startApp();
  }
  debugger;
  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
   // 
    let userinfo = this.user.checkToken();
    
    //this.navCtrl.push(MainPage);
  if(userinfo){
    this.listmenu.getmenu(this.menuobj).subscribe((resp) => {
      this.events.publish('menu:created', resp, Date.now());
      this.username=this.user.USERNAME;
    this.navCtrl.push(MainPage);})
  }else{
    console.log('loginpage');
    this.navCtrl.push('LoginPage');
  }
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
