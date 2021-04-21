import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the ReportVolunteerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-volunteer',
  templateUrl: 'report-volunteer.html',
})

export class ReportVolunteerPage {
  tabBarElement: any;
  accountinfoobj:{appid:string,roleid:string,userid:string,templeid:string}={appid:"",roleid:"",userid:"",templeid:''}
  pageinfoobj: any;
  eventobj: ArrayBuffer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pageinfoobj=navParams.get('item');
    //user.getreport_volunteeringList(this.accout)
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.accountinfoobj.userid=resp;
      this.accountinfoobj.appid=this.user.APPID;
      this.accountinfoobj.roleid=this.user.ROLE_ID_TOKEN_KEY;
      this.accountinfoobj.templeid=this.pageinfoobj.TempleID;
      this.user.gettempleeventByTemple(this.accountinfoobj).subscribe((res)=>{
        this.eventobj=res;
        this.user.loaderdismiss()
      })
    })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportVolunteerPage');
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }


  onChange(val){
    alert(val);
  }

  
}
