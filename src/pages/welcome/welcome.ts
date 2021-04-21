import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';
import { Menu} from '../../providers/menu/menu';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  menuobj: { roleid: any, clientid:string, appid:string} = {
    
    roleid: '',
    clientid: "",
    appid: ""
  };
  username: string;

  
  constructor(public navCtrl: NavController, public user: User,public listmenu:Menu,public events: Events,) { 
    let userinfo = this.user.checkToken();
    console.log('calllogin');
    this.menuobj.clientid=this.user.CLIENTID;
    this.menuobj.appid=this.user.APPID;
    this.menuobj.roleid = this.user.ROLE_ID_TOKEN_KEY;
    if(userinfo){
      this.listmenu.getmenu(this.menuobj).subscribe((resp) => {
        this.events.publish('menu:created', resp, Date.now());
        this.username=this.user.USERNAME;
      this.navCtrl.push(MainPage);})
    }else{

      this.navCtrl.push('LoginPage');
    }
  }

  login() {
   
   
      this.navCtrl.push('LoginPage');
    

    
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
