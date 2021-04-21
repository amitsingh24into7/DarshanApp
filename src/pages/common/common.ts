import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ CommonPageApi } from '../../providers/common/common_page_api' 
import {DomSanitizer} from '@angular/platform-browser'
import { User } from '../../providers/user/user'
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CommonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-common',
  templateUrl: 'common.html',
})
export class CommonPage {
    pageTitle:string='';
  pageUrl;
pagecontent: any;

requestobj: { roleid: any, clientid:string,singleTempleID:string, appid:string,lang:string,userid:string,pagetype:string} = {
  singleTempleID:'',
  roleid: '',
  clientid: "",
  appid: "",
  lang:"",
  userid:"",
  pagetype:''
};
  tabBarElement: any;
  
  constructor(private user:User, private sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams, public commonPageApi:CommonPageApi,private storage: Storage) {
    debugger;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.pagecontent=this.commonPageApi.getcommonPage();
    console.log('~~~~~~~~~~~~~~+',JSON.stringify(navParams.get('page')));
    let adsurl=navParams.get('adsurl');
    if(navParams.get('adsurl')){
                
    //alert(adsurl);
        if(adsurl!='#'){
          this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(adsurl);
        }else{
          adsurl='';
          this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(adsurl);
        }
    }else if(navParams.get('pagetype')){  
      let data=navParams.get('pg_content')
      if(data!=null){
        this.pageTitle=data.pgtitle
      }
      
      if(data.href!='#'){
        this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data.href);
      }else{
        adsurl='';
        this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(adsurl);
      }      
      
      // this.requestobj.pagetype=navParams.get('pagetype');
      // this.requestobj.appid=this.user.APPID
      // this.requestobj.clientid=this.user.CLIENTID
      // this.requestobj.roleid=this.user.ROLE_ID_TOKEN_KEY
      // this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
      //   this.requestobj.singleTempleID=res
      //   this.storage.get(this.user.USER_ID_TOKEN_KEY).then(userid => {
      //     this.requestobj.userid=userid;
      //     this.user.get_adsobj(this.requestobj).subscribe(data=>{
      //       console.log(this.requestobj);
      //       this.pageTitle=data.pgtitle
      //       if(data.href!='#'){
      //         this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data.href);
      //       }else{
      //         data.href='';
      //         this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(data.href);
      //       }
      //     })


      //   })
      // })

      
    }
    
    else{
     let pageParm = navParams.get('page');
      this.pageTitle = pageParm.MenuName;
      if(pageParm.ExternalURL!='#'){
        this.pageUrl='http://eduketor.in/darshanapp/'+pageParm.ExternalURL+'?clientid='+this.user.CLIENTID+'&appid='+this.user.APPID+'&userid='+this.user.USER_ID_TOKEN_KEY+'&roleid='+this.user.ROLE_ID_TOKEN_KEY;
      //this.pageUrl='http://eduketor.in/darshanapp/'+pageParm.ExternalURL+'?clientid='+this.user.CLIENTID+'&appid='+this.user.APPID+'&userid='+this.user.USER_ID_TOKEN_KEY+'&roleid='+this.user.ROLE_ID_TOKEN_KEY;
      this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.pageUrl);
  
      }else{
        this.pageUrl="";
      //this.pageUrl='http://eduketor.in/darshanapp/'+pageParm.ExternalURL+'?clientid='+this.user.CLIENTID+'&appid='+this.user.APPID+'&userid='+this.user.USER_ID_TOKEN_KEY+'&roleid='+this.user.ROLE_ID_TOKEN_KEY;
      this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.pageUrl);
      }
    }


    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommonPage');
  }
  

  backEvent(){
    this.navCtrl.push("ItemDetailPage", {
      item: ''
    });
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
}

