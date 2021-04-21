import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user/user';

/**
 * Generated class for the ServicedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 */

@IonicPage()
@Component({
  selector: 'page-servicedetail',
  templateUrl: 'servicedetail.html',
})

export class ServicedetailPage {
  Servicedetail: any;
  imagelocation: string;
  cartadded:any;
  pginfo: { MenuName: any, ExternalURL:string} = {
    
    MenuName: '',
    ExternalURL: ""
   
  };
  userinfo:{appid:string,roleid:string,userid:string,serviceid:string,clientid:string}={appid:'',roleid:'',userid:'',serviceid:'',clientid:''}
  timelistobj: ArrayBuffer;
  tabBarElement: any;
  languageobj:any;
  templeName:string;
  def_lang:{val:string}={val:''}
  ServiceVideo: ArrayBuffer;
  constructor(public navCtrl: NavController,public user: User, public navParams: NavParams, private sanitizer: DomSanitizer) {
    debugger;
    this.Servicedetail = navParams.get('serviceobj');
    this.pginfo.ExternalURL=this.Servicedetail.OBURL;
    this.templeName=this.Servicedetail.TempleName;
    this.pginfo.MenuName=this.Servicedetail.OBPageName;
    this.imagelocation=user.IMAGELOCATION;
    this.cartadded=false;
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"LANGUAGE"
    };  
    
   // this.user.gelocaldata(this.user.LANG).then(data=>{
      debugger;
      this.def_lang.val=navParams.get('selectedlang');
      this.Servicedetail.lang=this.def_lang.val;
      this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
        this.languageobj=data;
        this.getSelectedLang(this.def_lang.val)
      })
     
   // }) 
    
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.userinfo.userid=data;
      this.userinfo.appid=this.user.APPID
      this.userinfo.clientid=this.user.CLIENTID
      this.userinfo.roleid=this.user.ROLE_ID_TOKEN_KEY
      this.userinfo.serviceid=this.Servicedetail.ServiceID;
      this.user.getservicetiming(this.userinfo).subscribe((timeresp)=>{
        this.timelistobj=timeresp
      })
    })
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicedetailPage',JSON.stringify(this.Servicedetail ));
  }

  // addtoCart(Servicedetailobj:any){
  //   // this.navCtrl.push('MycartPage', {
  //   //   cartItem: Servicedetailobj
  //   // });
  //   if(this.user.useraddToCart(Servicedetailobj)){
  //     this.cartadded=true;
  //   }
  // }
  // gotoCart(){
  //   this.navCtrl.push('MycartPage', {
  //       cartItem: ''
  //     });
  // }
  openRelatetPage(page: any) {
    this.navCtrl.push('CommonPage', {
             page: page
      
  })
  }
  getSelectedLang($event){
    debugger;
    this.def_lang.val=$event;
    this.Servicedetail.lang=$event;
   
    this.user.gettempleservice_By_lang(this.Servicedetail).subscribe((resobj)=>{
      this.Servicedetail=resobj
      this.user.get_service_video(this.Servicedetail).subscribe((resobj)=>{
        this.ServiceVideo=resobj
      })
    })
   
    
}

  ionViewWillEnter() {
    
    this.tabBarElement.style.display = 'none';

  }
  ionViewWillLeave()
  {
   
  
      this.tabBarElement.style.display =null;

  }
  openDonatePage(bookingFrom){
    debugger
   this.Servicedetail.TempleName=this.templeName;
    console.log("pginfo",this.Servicedetail)
      this.navCtrl.push('DonationPage',{'forservice':this.Servicedetail,'donationtype':'Service','ServiceBooking':bookingFrom})
    }

    getSantizeUrl(url : string) { 


      return this.sanitizer.bypassSecurityTrustHtml(url)
  }
}
