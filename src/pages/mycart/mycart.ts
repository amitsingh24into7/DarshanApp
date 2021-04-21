import { Component } from '@angular/core';
//import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user/user';

/**
 * Generated class for the MycartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-mycart',
  templateUrl: 'mycart.html',
})
export class MycartPage {

  payPaltransObj:any;
accountInfo:{clientid:string,appid:string,roleid:string,userid:string,templeid:string,isadmin:boolean}={clientid:'',appid:'',roleid:'',userid:'',templeid:'',isadmin:false}
  pageinfoobj: any;
  pg_title:string
  isadmin:boolean=false
  tabBarElement: any;
  pages: { MenuName: string; component: string; }[];
  username: string;
//private fb: Facebook,
  constructor(public user:User,public navCtrl: NavController, public navParams: NavParams,private googlePlus: GooglePlus,public events: Events) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      if(this.pageinfoobj=navParams.get('item')){ // ---------from manage temple
        this.pg_title="All Booking";
        this.isadmin=true
      }else{
        this.pg_title="My Booking";
        this.isadmin=false
      } 
    this.pageinfoobj=navParams.get('item');
    
    
  }
  openItem(obj){
    
    if(obj.ItemDetails=='purchase'){
      this.navCtrl.push('PurchaseInvicePage',{detailovj:obj})
    }else{
      this.navCtrl.push('PaymentdetailPage',{detailovj:obj,isadmin:this.isadmin})
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MycartPage');
  }

  
  logoutFunction(){
    //this.storage.set('Logintype','Google')
    this.user.gelocaldata('Logintype').then(loginTyperesp=>{
      if(loginTyperesp=='Google'){
        this.googlePlus.logout()
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      }else if(loginTyperesp=='Facebook'){
        // this.fb.logout()
        // .then(res => {
        //   console.log(res);
        // })
        // .catch(err => console.log(err));
      }else{

      }
    })    
    this.user.logout().then(res => {
          
      this.pages = [
        { MenuName: 'Login', component: 'LoginPage' },
        { MenuName: 'Signup', component: 'SignupPage' },
       
      ];
      //this.username='';
      this.username='';
      this.events.publish('menu:created', this.pages, Date.now());
      this.navCtrl.setRoot('LoginPage');
    });
  }

  ionViewWillEnter() {
    if(this.navParams.get('item')){
    this.tabBarElement.style.display = 'none';
    //console.log(JSON.stringify(this.pageinfoobj));
    this.accountInfo.templeid=this.pageinfoobj.TempleID
    this.accountInfo.isadmin=true;
    }

    this.user.presentLoadingCustom();
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.accountInfo.userid=data;
      this.accountInfo.appid=this.user.APPID;
      this.accountInfo.clientid=this.user.CLIENTID
      this.accountInfo.roleid=this.user.ROLE_ID_TOKEN_KEY;
      //this.accountInfo.templeid=user
      this.user.getpaymentdetailsByUserID(this.accountInfo).subscribe((res)=>{
        this.payPaltransObj=res;
        this.user.loaderdismiss();
    })
    })
  }
  ionViewWillLeave()
  {
    if(this.navParams.get('item')){
      this.tabBarElement.style.display =null;
      }
    
  }
  

}
