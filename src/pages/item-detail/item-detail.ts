import { Component, ViewChild,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams ,Content, AlertController,Slides } from 'ionic-angular';
import{User} from '../../providers/user/user'; 
import { Items } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';

//import { isBlank } from 'ionic-angular/umd/util/util';
//import { ConditionalExpr } from '@angular/compiler';
//import { ScrollHideConfig } from '../../providers/user/scroll-hide';
//import {MdTabsModule} from 'md-tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})

export class ItemDetailPage {
  appobj: { clientid:string, appid:string} = {
    clientid: "",
    appid: ""
  };
  pginfo: { MenuName: any, ExternalURL:string} = {
    
    MenuName: '',
    ExternalURL: ""
   
  };
  issubscribe=false;
  footerIsHidden=false;
  //const MainPage = 'ListMasterPage';
  @ViewChild('slides') slides: Slides;
  @ViewChild(Content) content:Content;
  //@ViewChild('content') private content: any;
  showhodeheader=false;
  iconshowhide=false;
  item: any;
  templeserviceobj:any;
  socialShareConfig: any=[];
  imagelocation:string='';
  account: { clientid:string, appid:string,templeid:string,lang:string} = {
    clientid: "",
    appid: "",
    templeid:'',
    lang:'',
  };
  eventobj: ArrayBuffer;
  languageobj:any;
  def_lang:{val:string}={val:''}
  googleappUrl: ArrayBuffer;
  //footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  //headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };







 


















  constructor(public zone:NgZone, private socialSharing: SocialSharing,public user: User, public navCtrl: NavController, navParams: NavParams, public items: Items,private alertCtrl: AlertController) {
    debugger
    this.user.testapi().subscribe(data=>{
      debugger
      console.log(JSON.stringify(data))
    })
    //
    

    
    /////////////////////////////////////
    debugger;
    this.appobj.appid=user.APPID;
    this.appobj.clientid=user.CLIENTID;
    this.user.getAppUrl(this.appobj).subscribe(data=>{
      if(data){
        debugger;
       this.googleappUrl=data
      }
    })


    //this.account.lang=this.def_lang.val;
    //this.scrollTOTop();
    //console.log(this.headerScrollConfig);
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"LANGUAGE"
    };    
   
    


    //document.getElementsByClassName('fixed-content').

    this.imagelocation=user.IMAGELOCATION;
    //console.log('~~~~~~~~~~~~~~+',JSON.stringify(navParams.get('item')));  
    this.account.appid=this.user.APPID;
    this.account.clientid=this.user.CLIENTID;
   
    this.item = navParams.get('item');
    this.user.recentActivity.push(this.item);
    this.account.templeid=this.item.TempleID;
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      let tempuserobj:{userid:string,templeid:string}={
        userid:data,
        templeid:this.item.TempleID       
         }        
          this.user.scribedfunction(tempuserobj).subscribe((data:any)=>{            
            let datas=data[0];
            if(datas){
              debugger;
              if(datas.TempleID==this.item.TempleID){
                this.issubscribe=true
              }else{
                this.issubscribe=false
                }
            }else{
              this.issubscribe=false
            }
           
          })
       }
      )
         
    //;

    this.user.gelocaldata(this.user.LANG).then(data=>{
      debugger;
      this.def_lang.val=data;
      this.account.lang=this.def_lang.val;
      this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
        this.languageobj=data;
        this.getSelectedLang(this.def_lang.val)
      })
     // this.gettempleservice(this.item);
    //this.gettempleeventByTemple();
    })    
    // document.getElementsByClassName('').remove
    // document.body.style.setProperty('--my-var', colorVar)

  }







  gettempleservice(items){
   this.items.gettempleservice(this.account).subscribe((resobj)=>{
      this.templeserviceobj=resobj;
      this.user.getSicialShareConfig(this.account).subscribe((resp) => {
        //this.templeserviceobj=items.gettempleservice(this.account);
       
        this.socialShareConfig=resp;
        //
        this. gettempleeventByTemple()
      });
      
    })
  }

  gettempleeventByTemple(){
    this.user.gettempleeventByTemple(this.account).subscribe((eventresobj)=>{
      this.eventobj=eventresobj;
          })
  }
 
  openModulegalery(){
    this.navCtrl.push('GalleryPage',{templeid:this.item.TempleID});
  }
  getSelectedLang($event){
    debugger;
    this.def_lang.val=$event;
    this.account.lang=$event;
    let quriparmobj:{templeiID:string,lang:string}={templeiID:this.item.TempleID,lang:this.def_lang.val}
   this.user.get_Temple_By_ID_lang(quriparmobj).subscribe(resp=>{
    this.item=resp
    this.gettempleservice(this.item);
    this.gettempleeventByTemple();
   })
    
}

  subscribedfunction(){
    //userid=1&templeid=3&action=s
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      let tempuserobj:{userid:string,templeid:string,action:string}={
        userid:data,
        templeid:this.item.TempleID,
        action:'s'
      }
      
      this.user.scribedfunction(tempuserobj).subscribe(data=>{
        // let toast = this.toastCtrl.create({
        //   message: data.status,
        //   duration: 3000,
        //   position: 'top'
        // });
        // toast.present();
      })
      this.issubscribe=true
    })
    
    
  }
  // openmapfunction(push){

  // }
  unsubscribedfunction(){
    //userid=1&templeid=3&action=s
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      let tempuserobj:{userid:string,templeid:string,action:string}={
        userid:data,
        templeid:this.item.TempleID,
        action:'u'
      }
      this.user.scribedfunction(tempuserobj).subscribe(data=>{
        // let toast = this.toastCtrl.create({
        //   message: data.status,
        //   duration: 3000,
        //   position: 'top'
        // });
        // toast.present();

      })
      this.issubscribe=false;
    })
    
    
  }
  ionViewDidLoad() {
    
    
 
}

  public scrollamount=0;

  scrollTOTop()
  {   
   this.zone.run(()=>{
    this.scrollamount++;    
    if(this.content.scrollTop>50){
      this.showhodeheader=true;
      //this.iconshowhide=false;
      
    }
    if(this.content.scrollTop>543){
      this.iconshowhide=true
    }else{
      this.iconshowhide=false;
    }
    if(this.content.scrollTop<50){
      this.showhodeheader=false;
      //this.iconshowhide=true;
      console.log('this.showhodeheader=false;');
     }
     console.log('this.content.scrollTop=',this.content.scrollTop);
     


    //  for (let index = 0; index <this.templeserviceobj.length; index++) {
    //   console.log(this.templeserviceobj[index].ServiceTitle+"-document.getElementById",document.getElementById(this.templeserviceobj[index].ServiceTitle).offsetTop);
    //   if(document.getElementById(this.templeserviceobj[index].ServiceTitle).offsetTop==this.content.scrollTop){
    //     //this.slides.slideNext(index);
    //     this.slides.slideTo(index)
        
    //     console.log(this.templeserviceobj[index].ServiceTitle+"-document.getElementById",document.getElementById(this.templeserviceobj[index].ServiceTitle).offsetTop);
    //    }
    //  }
     
   })

  
  
  }
  slidescroll(elementId){
    let y = document.getElementById(elementId).offsetTop;
        this.content.scrollTo(0, y);
        console.log('yyyy---:',y);
  
  }


  // backEvent(){
  //   this.navCtrl.setRoot("TemplesPage", {
  //     item: ''
  //   });
  // }
  
socialShareFunction(socialShareFunction,imsgeurl){
 debugger;
  this.socialSharing.share(socialShareFunction+ this.googleappUrl[0]["appshare"], null,imsgeurl, "Android - "+this.googleappUrl[0]["AppURL"]); 
}
  openTab(cityName:any){
    //alert(cityName);;
    let i:any, tabcontent:any, tablinks:any;

    tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
 
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  event.currentTarget.className += " active";
  }
whatsappShare(addobj) {
    //const msg = this.compilemsg(index);
    //this.router.navigate(['/tabs/tab3', msg]);
    this.navCtrl.push('SearchPage', {
      addobjindex: addobj
    });
}
openServicedetailPage(Servicedetailobj:any){
  Servicedetailobj.TempleName=this.item.TempleName
  this.navCtrl.push('ServicedetailPage', {
    serviceobj: Servicedetailobj,selectedlang:this.def_lang.val
  });

  debugger;
//   this.pginfo.ExternalURL=Servicedetailobj.OBURL;
//   this.pginfo.MenuName=Servicedetailobj.ServiceTitle;
//   this.navCtrl.push('CommonPage', {
//     page:this.pginfo

// });

}

openmap(pginfo){
  this.navCtrl.push('GooglemapPage', {
    pageinfo:pginfo

});
}


openEventPage(Servicedetailobj:any){
 
  debugger;
  Servicedetailobj.TempleName=this.item.TempleName
  this.navCtrl.push('EventdetailPage', {
    pageinfo:Servicedetailobj,selectedlang:this.def_lang.val

});
}




allwhatsappShare(addobj){
  const msg = addobj.AdsTitle+addobj.AdsDescription;
  this.socialSharing.shareViaWhatsApp(msg, this.imagelocation+addobj.AdsImage, addobj.AdsURL);
}

facebookShare(addobj) {
  const msg = addobj.AdsTitle+addobj.AdsDescription;
  this.socialSharing.shareViaFacebook(msg, this.imagelocation+addobj.AdsImage, addobj.AdsURL);
}
twitterShare(addobj) {
  const msg = addobj.AdsTitle+addobj.AdsDescription;
  this.socialSharing.shareViaTwitter(msg, this.imagelocation+addobj.AdsImage, addobj.AdsURL);
}

openproduct(templeserviceobj){
 
  console.log(JSON.stringify(this.pginfo));

  let htmldata: object []=[];
  templeserviceobj.forEach(element => {
    htmldata.push({
      type: 'radio',
      label: element.ServiceTitle,
      value: element.OBURL
      
});
});
let alert = this.alertCtrl.create();

  // let alert = this.alertCtrl.create({
  //   title: 'Products',
  //   inputs:[htmldata],
        
  //   buttons: [
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
        
  //       handler: data => {
  //         console.log('Cancel clicked');
  //       }
  //     },
  //     {
  //       text: 'Submit',
  //       handler: data => {
  //         if (data) {
            
  //             this.navCtrl.push('CommonPage', {
  //                      page: data
                
  //           })
  //           // for (let index = 0; index < data.jaapcounter; index++) {
  //           //   this.playAudio(track,data.jaapcounter);
              
  //           // }
            
  //         // this.playAudio(track,data.jaapcounter);
  //             //this.playAudio(track,data.jaapcounter);
  //          // console.log(palysts);

  //           //this.playAudio(track,data.jaapcounter);
  //         } else {
  //           // invalid login
  //           return false;
  //         }
  //       }
  //     }
  //   ]

    
  // });

  for(let i=0;i<htmldata.length;i++)
  {
   alert.addInput({type: 'radio',name:'product', label:htmldata[i]['label'], value: htmldata[i]['value']+'~'+htmldata[i]['label'], });
  }
  
alert.addButton({text:'ok',handler: (data:any) => {
              debugger;
            console.log('OK clicked: '+data );
            data=data.split('~');
            this.pginfo.ExternalURL=data[0];
    this.pginfo.MenuName=data[1];
            this.navCtrl.push('CommonPage', {
                                   page: this.pginfo
                            
                        });

            }});

    alert.present();
  
  //alert.present();
}


openDonatePage(){
console.log("pginfo",this.item)
// this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
// this.user.donateobj.userid=resp
// this.user.gelocaldata(this.user.EMAIL_TOKEN_KEY).then(emilresp=>{
//   this.user.donateobj.email=emilresp
//   this.user.donateobj.username=this.user.USERNAME
//   this.user.donateobj.templeName=this.item.TempleName
//   this.user.donateobj.templeid=this.item.TempleID
//   })
// })
//
  this.navCtrl.push('DonationPage',{'pageinfoObj':this.item,'donationtype':'Donation'})
}

boxscroll(classname){
  let todayItem = document.getElementById(classname);
    todayItem.scrollIntoView(true);
    
}

openDonatePageofService(serviceObj){
  this.navCtrl.push('DonationPage',{'pageinfoObj_forservice':serviceObj,'donationtype':'Service'})
}


openCartlistPage(itemsobj){
  this.navCtrl.push('CartListPage', {
    item: itemsobj
  })
}


}
