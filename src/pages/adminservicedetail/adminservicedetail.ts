import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the AdminservicedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminservicedetail',
  templateUrl: 'adminservicedetail.html',
})
export class AdminservicedetailPage {

  pgdetailitomobj:any;
  tabBarElement: any;
  stservicetimeobj: any;
  publicUnpublishobj:{ roleid: any, clientid:string, appid:string,userID:string,ServiceID:string,ispublush:string} = {    
    roleid: '',
    clientid: "",
    appid: "",
    ServiceID:'',
    userID:"",
    ispublush:''
  }  
  tempobj:{clientid:string,appid:string,roleid:string,userid:string,serviceid:string}={appid:"",roleid:"",userid:"",serviceid:'',clientid:''}
  imagelocation: string;
  def_lang:{val:string}={val:''}
  languageobj: ArrayBuffer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,private alertCtrl: AlertController) {
   // debugger;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pgdetailitomobj=this.navParams.get('detailitem');
    //this.user.presentLoadingCustom();
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.tempobj.userid=resp;
      this.tempobj.clientid=this.user.CLIENTID;
      this.tempobj.appid=this.user.APPID;
     this.tempobj.roleid=this.user.ROLE_ID_TOKEN_KEY;
      this.tempobj.serviceid=this.pgdetailitomobj.ServiceID;
        //publish unpublish
        this.publicUnpublishobj.userID=resp
        this.publicUnpublishobj.appid=user.APPID
        this.publicUnpublishobj.clientid=user.CLIENTID
        this.publicUnpublishobj.roleid=user.ROLE_ID_TOKEN_KEY
        this.publicUnpublishobj.ServiceID=this.pgdetailitomobj.ServiceID;
        let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
          clientid: "",
          appid: "",
          configtype:"LANGUAGE"
        };
        
        this.user.gelocaldata(this.user.LANG).then(data=>{
          debugger;
          //this.account.lang=data
          this.def_lang.val=data;
          this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
            this.languageobj=data;
          })
        })

      this.user.getservicetiming(this.tempobj).subscribe((res)=>{
        this.stservicetimeobj=res;
       // this.user.loaderdismiss();
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminservicedetailPage');
  }
  getSelectedLang($event){
    this.def_lang.val=$event;
    this.pgdetailitomobj.lang=$event;
    debugger;
    // let quriparmobj:{templeiID:number,lang:string}={templeiID:this.account.TempleID,lang:this.def_lang.val}
    
      this.user.gettempleserviceby_lang_admin(this.pgdetailitomobj).subscribe(resp=>{
        let temparray:any=resp;
        this.pgdetailitomobj.ServiceTitle=temparray.ServiceTitle;
        this.pgdetailitomobj.ServiceShortDesc=temparray.ServiceShortDesc;
        this.pgdetailitomobj.ServiceLongDesc=temparray.ServiceLongDesc;
      })
  }

  ionViewWillEnter()
  {
    this.imagelocation=this.user.IMAGELOCATION;
    //this.user.presentLoadingCustom();
    this.user.getservicetiming(this.tempobj).subscribe((res)=>{
      this.stservicetimeobj=res;
     // this.user.loaderdismiss()
    })
      this.tabBarElement.style.display = 'none';
  }
  openmoduleforupdate(ComponentNmae,dataobj){
    this.navCtrl.push(ComponentNmae,{"updateformdata":dataobj});      

  }
  openmoduleforaddmoretime(ComponentNmae,dataobj){
    debugger;
    this.navCtrl.push(ComponentNmae,{"addnewformdata":dataobj});      

  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }

  openimagegall(ComponentNmae,formdata){
    this.navCtrl.push(ComponentNmae,{"updateserviceimagedata":formdata});   
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

}
