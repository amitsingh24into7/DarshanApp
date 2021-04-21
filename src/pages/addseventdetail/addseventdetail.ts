import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the AddseventdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addseventdetail',
  templateUrl: 'addseventdetail.html',
})
export class AddseventdetailPage {
  deleteobj:{templeid:string,timeid:string,appid:string,clientid:string,userid:string}={templeid:'',timeid:'',appid:'',clientid:'',userid:''}

  pgdetailitomobj:any;
  tabBarElement: any;
  stservicetimeobj: any;
  payment_url:any
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
  def_lang:{val:string}={val:''}
  
  languageobj: ArrayBuffer;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public user:User) {
    debugger;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pgdetailitomobj=this.navParams.get('detailitem');
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.tempobj.userid=resp;
     this.tempobj.clientid=this.user.CLIENTID;
     this.deleteobj.clientid=this.user.CLIENTID;
     this.deleteobj.appid=this.user.APPID;
     
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
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"LANGUAGE"
    };
    this.user.gelocaldata(this.user.LANG).then(data=>{
      debugger;
      this.def_lang.val=data;
      this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
        this.languageobj=data;
      })
    })
  }
  ionViewDidLoad() {
    
console.log('ionViewDidLoad AddseventdetailPage');
  }
  ionViewWillEnter()
  {
    this.user.presentLoadingCustom();
    this.imagelocation=this.user.IMAGELOCATION;
    this.user.geteventtiming(this.tempobj).subscribe((res)=>{
      this.stservicetimeobj=res;
      this.user.get_t_e_payment_url(this.tempobj).subscribe((payresp)=>{
        this.payment_url=payresp;
        this.user.loaderdismiss();
      })
     
    })
      this.tabBarElement.style.display = 'none';
  }
  getSelectedLang($event){
    this.def_lang.val=$event;
    this.pgdetailitomobj.lang=$event;
    debugger;
    // let quriparmobj:{templeiID:number,lang:string}={templeiID:this.account.TempleID,lang:this.def_lang.val}
    
      this.user.gettempleeventsby_lang_admin(this.pgdetailitomobj).subscribe(resp=>{
        let temparray:any=resp;
       this.pgdetailitomobj.EventsTitle=temparray.EventsTitle;
       this.pgdetailitomobj.EventsShortDesc=temparray.EventsShortDesc;
       this.pgdetailitomobj.EventsLongDesc=temparray.EventsLongDesc;
       
      })
   
   
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

  openimagegall(ComponentNmae,formdata){
    this.navCtrl.push(ComponentNmae,{"updateeventimagedata":formdata});   
  }
  deletetime(timeindex){
    debugger;
    this.deleteobj.templeid=timeindex.TempleID
    this.deleteobj.timeid=timeindex.ID
    this.user.delete_time_id(this.deleteobj).subscribe(data=>{
      let index = this.stservicetimeobj.indexOf(timeindex);    
      if(index > -1){
        this.stservicetimeobj.splice(index, 1);
        
      }
    })   
     

  }
  deletetimeurl(urlobj){
    this.user.delete_pay_url(urlobj).subscribe((d_resp)=>{
      let index = this.payment_url.indexOf(urlobj);    
      if(index > -1){
        this.payment_url.splice(index, 1);
        
      }
    })
  }
}

