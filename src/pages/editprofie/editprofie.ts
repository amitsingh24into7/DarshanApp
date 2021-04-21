import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the EditprofiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editprofie',
  templateUrl: 'editprofie.html',
})
export class EditprofiePage {
  account: { username: string, email: string,userid:string,  appid: string,clientid:string,nakshatra:string,rashi:string ,gotra:string,birthdate:string,marriagedate:string,phone:string} = {
    username: '',
    email: '',
    userid:'',
    appid:'',
    clientid:'',
    nakshatra:'',
    rashi:'',
    gotra:'',
    birthdate:'',
    marriagedate:'',
    phone:''
  };
  
  tabBarElement: any;
  Nakshatra: any;
  Rashi: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,) {
    user.gelocaldata(user.EMAIL_TOKEN_KEY).then(res => {
      this.account.email=res;    
        
    })
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: this.user.CLIENTID,
      appid: this.user.APPID,
      configtype:"Nakshatra"
    };
    
    //this.validatorfunction();
    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.Nakshatra=resp;
    })
    
    user.gelocaldata(user.TOKEN_KEY).then(res => {
      this.account.username=res; 
      
    })
    
    user.gelocaldata(user.USER_ID_TOKEN_KEY).then(res => {
      this.account.userid=res; 
      user.getUserProfile(this.account).subscribe(data=>{
        let tempuser:any=data.user

        this.account.birthdate=tempuser.birthdate
        this.account.marriagedate=tempuser.marriagedate
        this.account.nakshatra=tempuser.nakshtra
        this.account.rashi=tempuser.rashi
        this.account.gotra=tempuser.gotra
        this.account.phone=tempuser.phone
      }) 
    })

    
    this.account.appid=user.APPID;
    this.account.clientid=user.CLIENTID;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  
  ionViewWillEnter()
  {
   
      this.tabBarElement.style.display = 'none';

  }

  ionViewWillLeave()
  {
   
  
      this.tabBarElement.style.display =null;

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofiePage');
  }

  nakshatraChange(getval){
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: this.user.CLIENTID,
      appid: this.user.APPID,
      configtype:"Rashi"
    };  

    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.Rashi=resp;
      var index=this.Nakshatra.findIndex(obj => obj.ConfigVal==getval);
      //alert(this.Nakshatra[index].ID);
      this.Rashi = this.Rashi.filter((item) => {
        return (item.parentid.indexOf(this.Nakshatra[index].ID) > -1);
      })
    })
   
  }
  updateProfile(){
    
    // Attempt to login in through our User service
    this.user.updateProfileServ(this.account).subscribe((resp) => {
     this.navCtrl.pop();
    //  this.events.publish('user:created', resp, Date.now());// Update  menu of all user info  
    //  let toast = this.toastCtrl.create({
    //   message: resp.status,
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
    }, (err) => {
      //this.navCtrl.push(MainPage);

      // Unable to sign up
      // let toast = this.toastCtrl.create({
      //   message: err,
      //   duration: 3000,
      //   position: 'top'
      // });
      // toast.present();
    });
  }
}
