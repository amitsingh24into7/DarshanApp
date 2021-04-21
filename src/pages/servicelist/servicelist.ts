import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the ServicelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicelist',
  templateUrl: 'servicelist.html',
})
export class ServicelistPage {
  tabBarElement: any;
  pageinfoobj: any;
  accountinfoobj:{appid:string,roleid:string,userid:string,templeid:string}={appid:"",roleid:"",userid:"",templeid:''}
  public templelistserviceobj: any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public user:User) {
    this.pageinfoobj=navParams.get('item');
    this.user.presentLoadingCustom()
    console.log(this.pageinfoobj);
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicelistPage');
  }
  
  
  ionViewWillEnter()
  {
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      this.accountinfoobj.userid=resp;
      this.accountinfoobj.appid=this.user.APPID;
      this.accountinfoobj.roleid=this.user.ROLE_ID_TOKEN_KEY;
      this.accountinfoobj.templeid=this.pageinfoobj.TempleID;
      this.user.gettempleserviceByTemple(this.accountinfoobj).subscribe((res)=>{
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
    
    let deleteobj:{ServiceID:string,action:number,appid:string,clientid:string,userid:string}={
      ServiceID:'',action:0,appid:'',clientid:'',userid:''
    };
    deleteobj.appid=this.user.APPID;
    deleteobj.clientid=this.user.CLIENTID;
    deleteobj.ServiceID=data.ServiceID;
    debugger;
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(respdata=>{
      deleteobj.userid=respdata;
      this.user.DeleteTempleService(deleteobj).subscribe((resp)=>{
        debugger;
        if(resp.status=="success"){
          let index = this.templelistserviceobj.indexOf(data);
    
        if(index > -1){
          this.templelistserviceobj.splice(index, 1);
        }
        //this.addedtemplebyuser
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





}
