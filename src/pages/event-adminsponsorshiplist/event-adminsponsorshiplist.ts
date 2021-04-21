import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the EventAdminsponsorshiplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-adminsponsorshiplist',
  templateUrl: 'event-adminsponsorshiplist.html',
})
export class EventAdminsponsorshiplistPage {

 
  stservicetimeobj: any;
  pgdetailitomobj: any;
  tabBarElement: any;
  servicedatail:any[]=[];
  localobjfortime:{templeservicetime:any[]}={templeservicetime:[]}
  sponsorshiplistobj: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User) {
    debugger;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pgdetailitomobj=this.navParams.get('addnewformdata');
    // this.servicedatail.push(this.navParams.get('formdata'));
    //this.localobjfortime.templeservicetime= 
    //this.user.removelocaldata('s_time_list');
   
  }
  

  ionViewWillEnter()
  {
      this.user.presentLoadingCustom()
      let userinfo:{clientid:string,appid:string,roleid:string,userid:string,eventid:string}={clientid:'',appid:'',roleid:'',userid:'',eventid:''}
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        userinfo.userid=data;
        userinfo.appid=this.user.APPID;
        userinfo.clientid=this.user.CLIENTID;
        userinfo.roleid=this.user.ROLE_ID_TOKEN_KEY;
        userinfo.eventid=this.pgdetailitomobj.EventsID;
        debugger;
        console.log(userinfo)
        this.user.sponsorshiplist(userinfo).subscribe((listresp)=>{
          this.sponsorshiplistobj=listresp;
        })
        this.user.loaderdismiss();
      })
      this.tabBarElement.style.display = 'none';
  }
  // doFormSubmit(){
  //   debugger;
  //   let labledataobj:any[]=[]
  //   this.user.gelocaldata('addtempleevent').then(rest=>{
  //     labledataobj.push(rest) ;
  //     labledataobj.push(this.localobjfortime);
  //     this.navCtrl.push('AddseventimagePage',{'formdata':labledataobj,'addservice':'addservice'})
  //     console.log(JSON.stringify(labledataobj));
  //   })
       
   
   
  //   }


  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventAdminsponsorshiplistPage');
  }
  openmodule(ComponentNmae){
    this.navCtrl.push(ComponentNmae,{"addnewformdata":this.pgdetailitomobj});
       
  }
  deletefunction(timeindex){
    
    this.user.deletesponsorship({sponsorshipid:timeindex.ID}).subscribe((resp)=>{

      if(resp.status=='success'){
        let index = this.sponsorshiplistobj.indexOf(timeindex);    
        if(index > -1){
          this.sponsorshiplistobj.splice(index, 1);
         
        }
      }
      
    })    
  }
  openmoduleforupdate(ComponentNmae,dataofSponsorship){
    this.navCtrl.push(ComponentNmae,{"addnewformdataUpdtae":dataofSponsorship});
      

  }
  
}
