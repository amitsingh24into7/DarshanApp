import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import{User} from '../../providers/user/user' ;
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DonationModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donation-model',
  templateUrl: 'donation-model.html',
})
export class DonationModelPage {
  public respObj:any;
  public selectedobj:any;
  selectedDesc: any;
  constructor(public user:User,public viewCtrl: ViewController,public navCtrl: NavController,private storage: Storage, public navParams: NavParams) {
  }

  ionViewWillEnter()
  {
    debugger;

    let navparmobj=this.navParams.get('requestobj');
    let type =this.navParams.get('type');
    let requestobj: {templeID:string,userID:string,serviceeventid:string,type:string}={templeID:'',userID:'',serviceeventid:'',type:''}
    requestobj.type=type
    
    requestobj.templeID=navparmobj.TempleID;
    requestobj.serviceeventid=navparmobj.ServiceID;
    
    // $templeID=$data["templeID"];
    // $userID=$data["userID"];
    // $serviceeventid=$data["serviceeventid"];
    // $type=$data["type"];
    // this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
    //     requestobj.templeID=res;
        this.storage.get(this.user.USER_ID_TOKEN_KEY).then(res => {
          requestobj.userID=res;
          this.user.get_service_event_option(requestobj).subscribe(respobj=>{
            this.respObj=respobj;
          })
    //})
    })
    
  }
  ionViewWillLeave()
  {
    
  }  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonationModelPage');
  }
  getSelectedoption(e:any){
    debugger;
    
    this.dismiss(e)
  }
  dismiss(objVal) {
   
    this.viewCtrl.dismiss(objVal);
  }

  closeModel(){
    this.viewCtrl.dismiss('close');
  }



  selectoption(tempobj){
    debugger;
    this.viewCtrl.dismiss(tempobj);
    //this.formobj.Amount=tempobj.price
    //this.selectedDesc =tempobj.optiondescription
  }



}
