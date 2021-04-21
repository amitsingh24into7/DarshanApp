import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the TodayCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-today-calendar',
  templateUrl: 'today-calendar.html',
})
export class TodayCalendarPage {
  tabBarElement: any;
  accountinfo:any;
  calobj: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayCalendarPage');
  }
  ionViewWillEnter()
  {
    let accountinfo:{templeid: string, clientid: string, appid: string, roleid: string}={templeid: "", clientid: "", appid: "", roleid: ""}
    this.user.gelocaldata(this.user.SINGAL_TEMPLE_ID).then(datares=>{
      debugger;
      if(datares){
      accountinfo.templeid=datares;
      accountinfo.clientid=this.user.CLIENTID;
      accountinfo.appid=this.user.APPID;
      accountinfo.roleid=this.user.ROLE_ID_TOKEN_KEY;
      this.user.getTodaycalender(accountinfo).subscribe(respobj=>{
        this.calobj=respobj
      })
      }
      
    })    
       
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
}
