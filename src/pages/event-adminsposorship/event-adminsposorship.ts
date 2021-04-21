import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{User} from '../../providers/user/user'; 
/**
 * Generated class for the EventAdminsposorshipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-adminsposorship',
  templateUrl: 'event-adminsposorship.html',
})
export class EventAdminsposorshipPage { 
  currencyobj: ArrayBuffer;
  tabBarElement: any;
  sponsorshipForm:{Details:string,appid:string,clientid:string,userid:string,Amount:string,EventID:string,Currency:string,Remarks:string,sponsorshipid:string}={Details:'',appid:'',clientid:'',userid:'',Amount:'',EventID:'',Currency:'',Remarks:'',sponsorshipid:''}
  isupdate: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.sponsorshipForm.appid=user.APPID;
    this.sponsorshipForm.clientid=user.CLIENTID;
    let navparmobj=this.navParams.get('addnewformdata')
    let updateformdata:any;
    if(updateformdata=this.navParams.get('addnewformdataUpdtae')){
      this.sponsorshipForm.EventID=updateformdata['EventID'];
      this.sponsorshipForm.Currency=updateformdata['Currency']
      this.sponsorshipForm.Amount=updateformdata['Amount']
      this.sponsorshipForm.Details=updateformdata['Details']
      this.sponsorshipForm.Remarks=updateformdata['Remarks']
      this.sponsorshipForm.sponsorshipid=updateformdata['ID']
      this.isupdate=true
    }else{
      this.sponsorshipForm.EventID=navparmobj["EventsID"];
    }
    
    user.gelocaldata(user.USER_ID_TOKEN_KEY).then(data=>{
      this.sponsorshipForm.userid=data;
    })
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: this.user.CLIENTID,
      appid: this.user.APPID,
      configtype:"CURRENCY"
    };
    
    //this.validatorfunction();
    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.currencyobj=resp;
    })
    console.log(this.currencyobj);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventAdminsposorshipPage');
  }
  ionViewWillEnter()
  {
    
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  doFormSubmit(){
    this.user.presentLoadingCustom()
    if(this.isupdate){
      this.user.updatesponsorship(this.sponsorshipForm).subscribe((resp)=>{
        this.user.loaderdismiss();
        this.navCtrl.pop();
      })
    }else{
      this.user.sponsorshiplistAdd(this.sponsorshipForm).subscribe((resp)=>{
        this.user.loaderdismiss();
        this.navCtrl.pop();
      })
    }
    
    console.log(this.sponsorshipForm)
  }

}
