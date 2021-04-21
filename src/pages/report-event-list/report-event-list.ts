import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the ReportEventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-event-list',
  templateUrl: 'report-event-list.html',
})
export class ReportEventListPage {

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ReportEventListPage');
  // }
  tabBarElement: any;
  pageinfoobj: any;
  accountinfoobj:{appid:string,roleid:string,userid:string,templeid:string}={appid:"",roleid:"",userid:"",templeid:''}
  public templelistserviceobj: any;
  toastCtrl: any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public user:User) {
    this.pageinfoobj=navParams.get('item');

    this.user.presentLoadingCustom()


    console.log(this.pageinfoobj);
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportEventListPage');
  }
  
  ionViewWillEnter()
  {
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.accountinfoobj.userid=resp;
      this.accountinfoobj.appid=this.user.APPID;
      this.accountinfoobj.roleid=this.user.ROLE_ID_TOKEN_KEY;
      this.accountinfoobj.templeid=this.pageinfoobj.TempleID;
      this.user.gettempleeventByTemple(this.accountinfoobj).subscribe((res)=>{
        this.templelistserviceobj=res;
        this.user.loaderdismiss()
      })
    })
    
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  openmodule(componentName:any){
    debugger;
    this.navCtrl.push(componentName,{'item':this.pageinfoobj});
  }

  openmoduledetail(componentName:any,tempobj:any){
    this.navCtrl.push(componentName,{'detailitem':tempobj});
  }
  

  


}
