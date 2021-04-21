import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the AddseventtimelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-addseventtimelist',
  templateUrl: 'addseventtimelist.html',
})
export class AddseventtimelistPage {

  stservicetimeobj: any;
  pgdetailitomobj: any;
  tabBarElement: any;
  servicedatail:any[]=[];
  localobjfortime:{templeservicetime:any[]}={templeservicetime:[]}

  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User) {
    debugger;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pgdetailitomobj=this.navParams.get('formdatatimelist');
    // this.servicedatail.push(this.navParams.get('formdata'));
    //this.localobjfortime.templeservicetime= 
    //this.user.removelocaldata('s_time_list');
  }
  

  ionViewWillEnter()
  {

    this.user.gelocaldata('e_time_list').then(resp=>{
      if(resp){
        this.localobjfortime.templeservicetime=[]
        resp.forEach(element => {
          this.localobjfortime.templeservicetime.push(element);
        });
        
      }
      if(this.pgdetailitomobj!=null){
        
        this.localobjfortime.templeservicetime.push(this.pgdetailitomobj);
        this.user.setlocaldata('e_time_list',this.localobjfortime.templeservicetime);
        this.pgdetailitomobj=null
       }
    })
    
   
   debugger;
    
    
    let tempobj:{clientid:string,appid:string,roleid:string,userid:string,serviceid:string}={appid:"",roleid:"",userid:"",serviceid:'',clientid:''}
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
      tempobj.userid=resp;
      tempobj.clientid=this.user.CLIENTID;
      tempobj.appid=this.user.APPID;
      tempobj.roleid=this.user.ROLE_ID_TOKEN_KEY;
      //tempobj.serviceid=this.pgdetailitomobj.ServiceID;
      // this.user.getservicetiming(tempobj).subscribe((res)=>{
      //   this.stservicetimeobj=res;
      // })
    })
      this.tabBarElement.style.display = 'none';
  }
  doFormSubmit(){
    debugger;
    let labledataobj:any[]=[]
    this.user.gelocaldata('addtempleevent').then(rest=>{
      labledataobj.push(rest) ;
      labledataobj.push(this.localobjfortime);
      this.user.gelocaldata('addpaymentURLobj').then(payurlrest=>{
      labledataobj.push(payurlrest);
      this.navCtrl.push('AddseventimagePage',{'formdata':labledataobj,'addservice':'addservice'})
      console.log(JSON.stringify(labledataobj));
      })
    })
       
   
   
    }


  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddseventtimelistPage');
  }
  openmodule(ComponentNmae){
    this.navCtrl.push(ComponentNmae,{"formdata":this.pgdetailitomobj});
       
  }
  deletefunction(timeindex){    
    let index = this.localobjfortime.templeservicetime.indexOf(timeindex);    
    if(index > -1){
      this.localobjfortime.templeservicetime.splice(index, 1);
      this.user.setlocaldata('e_time_list',this.localobjfortime.templeservicetime);
    }
  }
  
}
