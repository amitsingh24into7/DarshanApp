import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the ReportEventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-event-detail',
  templateUrl: 'report-event-detail.html',
})
export class ReportEventDetailPage {

  pgdetailitomobj:any;
  tabBarElement: any;
  stservicetimeobj: any;
  tempobj:{clientid:string,appid:string,roleid:string,userid:string,eventid:string}={appid:"",roleid:"",userid:"",eventid:'',clientid:''}
  publicUnpublishobj:{ roleid: any, clientid:string, appid:string,userID:string,EventsID:string,ispublush:string} = {    
    roleid: '',
    clientid: "",
    appid: "",
    EventsID:'',
    userID:"",
    ispublush:''
  }  
  imagelocation: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public user:User) {
    debugger;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pgdetailitomobj=this.navParams.get('detailitem');
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.tempobj.userid=resp;
     this.tempobj.clientid=this.user.CLIENTID;
     this.tempobj.appid=this.user.APPID;
      this.tempobj.roleid=this.user.ROLE_ID_TOKEN_KEY;
     this.tempobj.eventid=this.pgdetailitomobj.EventsID;
      //publish unpublish
      this.publicUnpublishobj.userID=resp
      this.publicUnpublishobj.appid=user.APPID
      this.publicUnpublishobj.clientid=user.CLIENTID
      this.publicUnpublishobj.roleid=user.ROLE_ID_TOKEN_KEY
      this.publicUnpublishobj.EventsID=this.pgdetailitomobj.EventsID;


      
      this.user.geteventtiming(this.tempobj).subscribe((res)=>{
        this.stservicetimeobj=res;
      })
    })   

  }

  ionViewDidLoad() {
    
console.log('ionViewDidLoad ReportEventDetailPage');
  }
  ionViewWillEnter()
  {
    this.user.presentLoadingCustom();
    this.imagelocation=this.user.IMAGELOCATION;
    this.user.geteventtiming(this.tempobj).subscribe((res)=>{
      this.stservicetimeobj=res;
      this.user.loaderdismiss();
    })
      this.tabBarElement.style.display = 'none';
  }
  openmoduleforupdate(ComponentNmae,dataobj){
    this.navCtrl.push(ComponentNmae,{"updateformdata":dataobj});      

  }
  openmoduleforaddmoretime(ComponentNmae,dataobj){ //// use for add time and Sponsorship
    debugger;
    this.navCtrl.push(ComponentNmae,{"addnewformdata":dataobj});      

  }

  publishtemple(dataobj,actiontemp){
    this.publicUnpublishobj.ispublush=actiontemp
    let alert = this.alertCtrl.create({
      title: 'Confirm '+actiontemp,
      message: 'Do you want '+actiontemp+' this Event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
           
            if(actiontemp=='Publish'){
              this.pgdetailitomobj.active=1;
            }else{
              this.pgdetailitomobj.active=0;
            }
           // this.publicUnpublishMethod(this.publicUnpublishobj) uncommment and change in method
            console.log('Yes clicked',this.publicUnpublishobj);
          }
        }
      ]
    });
    alert.present();



  }


  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }

  


}
