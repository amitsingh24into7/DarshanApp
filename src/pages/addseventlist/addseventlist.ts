import { Component } from '@angular/core';
//import { each } from 'hammerjs';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the AddseventlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-addseventlist',
  templateUrl: 'addseventlist.html',
})
export class AddseventlistPage {

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
    console.log('ionViewDidLoad AddseventlistPage');
  }
  
  ionViewWillEnter()
  {
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.accountinfoobj.userid=resp;
      this.accountinfoobj.appid=this.user.APPID;
      this.accountinfoobj.roleid=this.user.ROLE_ID_TOKEN_KEY;
      this.accountinfoobj.templeid=this.pageinfoobj.TempleID;
      this.user.gettempleeventByTemple(this.accountinfoobj).subscribe((res)=>{
        debugger
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
  openmoduleforupdate(componentName:any,tempobj:any){
    this.navCtrl.push(componentName,{'updateitem':tempobj});
  }

  deletefunction(data){
    
    let deleteobj:{EventsID:string,action:number,appid:string,clientid:string,userid:string}={
      EventsID:'',action:0,appid:'',clientid:'',userid:''
    };
    deleteobj.appid=this.user.APPID;
    deleteobj.clientid=this.user.CLIENTID;
    deleteobj.EventsID=data.EventsID;
    debugger;
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(respdata=>{
      deleteobj.userid=respdata;
      this.user.eventdeactive(deleteobj).subscribe((resp)=>{
        debugger;
        if(resp.status=="success"){
          let index = this.templelistserviceobj.indexOf(data);
    
        if(index > -1){
          this.templelistserviceobj.splice(index, 1);
        }
       
        
        }
        // let toast = this.toastCtrl.create({
        //   message: resp.status,
        //   duration: 3000,
        //   position: 'top'
        // });
        // toast.present();
      });
    });
    
   
  }

  

  Copyfunction(copyObj){

this.user.presentLoadingCustom();
    this.user.copy_event(copyObj).subscribe((resp)=>{
      let tempobj=[];
      //inserted_EventsID
      debugger
      let tempres:any;
      tempres=resp;
      copyObj.EventsID=tempres.inserted_EventsID;
      tempobj.push(copyObj);
    
     for(let i = 0; i < this.templelistserviceobj.length; i++){
      tempobj.push(this.templelistserviceobj[i]);
     }
     this.user.loaderdismiss()
      this.templelistserviceobj=tempobj;
    })


  }



}

