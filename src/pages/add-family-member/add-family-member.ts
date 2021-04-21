import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the AddFamilyMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-family-member',
  templateUrl: 'add-family-member.html',
})
export class AddFamilyMemberPage {
  tabBarElement: any;
  isHeavenly:boolean;
  account: { username: string, email: string,userid:string,  appid: string,clientid:string,nakshatra:string,rashi:string ,gotra:string,birthdate:string,marriagedate:string,phone:string,relation:string,gender:string,famID:number,deathdate:string,nametitle:string} = {
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
    phone:'',
    relation:'',
    gender:'',
    famID:null,
    deathdate:'',
    nametitle:''                     //////////---- use for update-------------------
  };
  Nakshatra: any;
  Rashi: any;
  isupdate: boolean;
  relation: ArrayBuffer;
  nametitle: ArrayBuffer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');




    // user.gelocaldata(user.EMAIL_TOKEN_KEY).then(res => {
    //   this.account.email=res;    
        
    // })
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: this.user.CLIENTID,
      appid: this.user.APPID,
      configtype:"Nakshatra"
    };
    
    //this.validatorfunction();
    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.Nakshatra=resp;
    })
    servicetypeParmObj.configtype='RELATIONSHIPTYPE';
    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.relation=resp;
    })
    servicetypeParmObj.configtype='NAMETITLE';
    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.nametitle=resp;
    })
    

    // user.gelocaldata(user.TOKEN_KEY).then(res => {
    //   this.account.username=res; 
      
    // })
    user.gelocaldata(user.USER_ID_TOKEN_KEY).then(res => {
      this.account.userid=res; 
      // user.getUserProfile(this.account).subscribe(data=>{
      //   let tempuser:any=data.user

      //   this.account.birthdate=tempuser.birthdate
      //   this.account.marriagedate=tempuser.marriagedate
      //   this.account.nakshatra=tempuser.nakshtra
      //   this.account.rashi=tempuser.rashi
      //   this.account.gotra=tempuser.gotra
      //   this.account.phone=tempuser.phone
      // }) 
    })

    
    this.account.appid=user.APPID;
    this.account.clientid=user.CLIENTID;

//--------------------------Update section------------------------------
    let updateaccountobj=this.navParams.get('updateitem')
    if(updateaccountobj){
      debugger
      this.isupdate=true;
      this.account.username=updateaccountobj.name
      this.account.email=updateaccountobj.email
      this.account.userid=updateaccountobj.createdBy
      this.account.deathdate=updateaccountobj.deathdate
      //this.account.appid=updateaccountobj.
      //this.account.clientid=updateaccountobj.
      this.account.nametitle=updateaccountobj.nametitle
      this.account.nakshatra=updateaccountobj.nakshatra
      this.account.rashi=updateaccountobj.rashi
      this.account.gotra=updateaccountobj.gotra
      this.account.birthdate=updateaccountobj.birthdate
      this.account.marriagedate=updateaccountobj.marriagedate
      this.account.phone=updateaccountobj.mobile
      this.account.relation=updateaccountobj.realtionship
      this.account.gender=updateaccountobj.gender
      this.account.famID=updateaccountobj.id
      this.nakshatraChange( this.account.nakshatra)
      this.onChangeNametitle(this.account.nametitle)

    }
  }
  onChangeNametitle($event){
   debugger;
    if($event=='Heavenly')
    this.isHeavenly=true
    else
    this.isHeavenly=false
    ;
    //alert(this.isHeavenly);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFamilyMemberPage');
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  nakshatraChange(getval){
    debugger;
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

  addfamliyMamber(){
       this.user.insertMyfamily(this.account).subscribe(resp=>{
         if(resp.status=='success'){
           this.navCtrl.pop();
         }
         console.log(resp);
       }) 
    
  }
  updatefamliyMamber(){
    this.user.updatefamliyMamber(this.account).subscribe(resp=>{
      if(resp.status=='success'){
        this.navCtrl.pop();
      }
      console.log(resp);
    }) 
  }
}

