import { Component, ViewChild,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams ,Content, AlertController,Slides } from 'ionic-angular';
import{User} from '../../providers/user/user'; 
import { Items } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the EventdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventdetail',
  templateUrl: 'eventdetail.html',
})
export class EventdetailPage {

  requestobj: { roleid: any, clientid:string,singleTempleID:string, appid:string,lang:string,userid:string,pagetype:string} = {
    singleTempleID:'',
    roleid: '',
    clientid: "",
    appid: "",
    lang:"",
    userid:"",
    pagetype:''
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
  account: { clientid:string, appid:string,eventid:string,roleid:string,userid:string,lang:string} = {
    clientid: "",
    appid: "",
    eventid:'',
    roleid:'',
    userid:'',
    lang:''
  };
  eventobj: ArrayBuffer;
  timelist: ArrayBuffer;
  eventImgobj: any;
  sponsorshipobj: ArrayBuffer;
  tabBarElement: any;
  languageobj:any;
  def_lang:{val:string}={val:''}
  templeName: any;
  EventVideo: ArrayBuffer;
  public donation_list_obj: any;
  templelist_obj: any;

  constructor(private storage: Storage,public zone:NgZone, private socialSharing: SocialSharing,public user: User, public navCtrl: NavController, navParams: NavParams, items: Items,private alertCtrl: AlertController,private sanitizer: DomSanitizer) {
    debugger;  
    this.imagelocation=user.IMAGELOCATION;
     
    this.account.appid=this.user.APPID;
    this.account.clientid=this.user.CLIENTID;
    this.account.roleid=this.user.ROLE_ID_TOKEN_KEY;
    debugger;
    if(navParams.get('pageinfo')){
      this.item = navParams.get('pageinfo');
      this.templeName=this.item.TempleName;
    }else{
      this.item = navParams.get('item');
      
    }
    this.user.gettempleaddressdetails({TempleID:this.item.TempleID} ).subscribe((templelist)=>{

      this.templelist_obj=templelist[0]
      
    })
   
    // EventsID: "39"
    // TempleID: "105"
    // EventsTitle: "Test event"
    // EventsType: "4"
    // EventsShortDesc: "Bdndjf"
    // EventsLongDesc: "Bxhdhf"
    // OBPossible: "0"
    // OBPageName: ""
    // OBURL: ""
    // CreatedBy: "1"
    // CreatedDate: "2020-01-19"
    // modifiedby: "0"
    // modifieddate: "2020-0
    this.account.eventid=this.item.EventsID;
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"LANGUAGE"
    }; 

    this.user.gelocaldata(this.user.LANG).then(data=>{
      debugger;
      if(navParams.get('selectedlang')){
        this.def_lang.val=navParams.get('selectedlang');
      }else{
        this.def_lang.val=data;
      }
      this.account.lang=this.def_lang.val;
      this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
        this.languageobj=data;
        this.getSelectedLang(this.def_lang.val)
      })
     
    }) 
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.account.userid=data;
      this.user.geteventtiming(this.account).subscribe((timeresp)=>{
        this.timelist=timeresp;
      })
      this.user.sponsorshiplist(this.account).subscribe((timeresp)=>{
        this.sponsorshipobj=timeresp;
      })
    })
    this.user.geteventimages(this.account).subscribe((imgresobj)=>{
      //this.eventImgobj=imgresobj;
      JSON.parse(JSON.stringify(imgresobj)).forEach(element => {
        if(element.EventImageType=='12'){
          this.eventImgobj=element.ImageURL;
        }
      });
          })
    // this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{

    //   let tempuserobj:{userid:string,templeid:string}={
    //     userid:data,
    //     templeid:this.item.TempleID       
    //      }        
    //       this.user.scribedfunction(tempuserobj).subscribe((data:any)=>{            
    //         let datas=data[0];
    //         if(datas){
    //           debugger;
    //           if(datas.TempleID==this.item.TempleID){
    //             this.issubscribe=true
    //           }else{
    //             this.issubscribe=false
    //             }
    //         }else{
    //           this.issubscribe=false
    //         }
           
    //       })
    //    }
    //   )
         
    //;

    items.gettempleservice(this.account).subscribe((resobj)=>{
      this.templeserviceobj=resobj;
      this.user.getSicialShareConfig(this.account).subscribe((resp) => {
        //this.templeserviceobj=items.gettempleservice(this.account);
       
        this.socialShareConfig=resp;
        //
      });
      
    })
    this.user.gettempleeventByTemple(this.account).subscribe((eventresobj)=>{
this.eventobj=eventresobj;
    })
    
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  getSelectedLang($event){
    debugger;
    this.def_lang.val=$event;
    this.account.lang=$event;
   
  //  this.user.get_Temple_By_ID_lang(quriparmobj).subscribe(resp=>{
  //   this.item=resp
  this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
    this.account.userid=data
    this.gettempleeventByTemple();
  })
  //  })
}
gettempleeventByTemple(){
  this.user.gettempleeventByTemple_by_lang(this.account).subscribe((eventresobj)=>{
   this.item=eventresobj;

   this.user.get_event_video(this.account).subscribe((resobj)=>{
    this.EventVideo=resobj
  })
   //-----------------------------
        })
}
ionViewDidLoad(){
  this.user.getCultural_Event_donation_list_by_id(this.item).subscribe((donation_list)=>{
    debugger;
    this.donation_list_obj=donation_list

    for(let i = 0; i <= this.donation_list_obj.length; i++){
      debugger
      if(this.donation_list_obj[i]){
        this.paypal_button(this.donation_list_obj[i].id,this.donation_list_obj[i])
      }
     
    } 

    //jkkjlkljlk
    
  })
}
  ionViewWillEnter() {
    
    this.tabBarElement.style.display = 'none';
    

  }

//////////////////////////////
paypal_button(ival,tempobj){
  debugger
  //let _this = this;

  // this.httpClient.get("assets/config.json").subscribe(data =>{
  //   let jsonobj=JSON.parse(JSON.stringify(data));
       
  //   this.get_pg_configobj.appid=jsonobj.APPID;
  //   this.get_pg_configobj.roleid=jsonobj.ROLE_ID;
  //   this.get_pg_configobj.templeID=jsonobj.templeID;
    
  // })
  setTimeout(() => {
    // Render the PayPal button into #paypal-button-container
    <any>window['paypal'].Buttons({

      // Set up the transaction
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
         
          {
            amount: {
              currency_code: tempobj.payment_url,
              value:  tempobj.amount,///amount
              //value:'0.01',
              breakdown: {
                item_total: {
                  currency_code: tempobj.payment_url,
                  value: tempobj.amount ///amount
                  //value:'0.01',
                }
              }
            },
            items: [
              {
                name: 'name',// title
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: tempobj.payment_url,
                  value: tempobj.amount,///amount,
                  //value:'0.01',
                },
              }
            ]
          }
        ]
        });
      },

      // Finalize the transaction
      onApprove:  (data, actions)=> {
        let details=actions.order.capture()
          .then((details)=> {
            
        
        // this.API.callAPI('insertpaymenttransactions.php',paypostobj).subscribe((resp)=>{
        //  //  this.servicelistobj=resp
        //  this.router.navigate(['pages/e-commerce/donation-list']);
        //   // console.log(JSON.stringify(resp))
        // });
    
        
        let  paypostobj:{
          tempelobj:
          {email:string,userid:string,ItemDetails:string,Amount:string,Currency:string,Remarks:string,ConfirmationBox:string,templeid:string,templeName:string,serviceid:string,serviceNmae:string,eventid:string,eventName:string,sponsorshipID:string},
    
          paypalresp:{client:{environment:string,paypal_sdk_version:string,platform:string,product_name:string},
          response:{create_time: string,id:string,intent:string,state:string}
         }
        }={
         tempelobj:
         {email:'',userid:'',ItemDetails:'',Amount:'',Currency:'',Remarks:'',ConfirmationBox:'',templeid:'',templeName:'',serviceid:'',serviceNmae:'',eventid:'',eventName:'',sponsorshipID:''},
    
         paypalresp:{client:{environment:'',paypal_sdk_version:'',platform:'web',product_name:''},
         response:{create_time: '',id:'',intent:'',state:''}
        }
       }
    console.log(paypostobj);


    
      //let jsonobj=JSON.parse(JSON.stringify(data));
        debugger;
        // Show a success message to the buyer
        //let tempuser=JSON.parse(localStorage.getItem('APIlogininfo'))
        paypostobj.paypalresp.response.create_time=details['purchase_units'][0]["payments"].captures[0].create_time;
        paypostobj.paypalresp.response.id=details['purchase_units'][0]["payments"].captures[0].id;
        paypostobj.paypalresp.response.intent=''
        paypostobj.paypalresp.response.state=details['purchase_units'][0]["payments"].captures[0].status
         
        

        //paypostobj.tempelobj.userid=tempuser.user.ID
       paypostobj.tempelobj.ItemDetails=''
        paypostobj.tempelobj.Amount= tempobj.amount
          paypostobj.tempelobj.Currency=tempobj.payment_url,
          paypostobj.tempelobj.serviceid=tempobj.eventID+'_'+tempobj.id
          paypostobj.tempelobj.serviceNmae=tempobj.title
        
       
        
        paypostobj.tempelobj.Remarks=details.EventsLongDesc
        paypostobj.tempelobj.ConfirmationBox=''
       // paypostobj.tempelobj.templeid=jsonobj.templeID;
        paypostobj.tempelobj.templeName=details.EventsTitle
        
        //this.API.paypostobj.tempelobj.eventid=''
        //this.API.paypostobj.tempelobj.eventName=EventsTitle
       paypostobj.tempelobj.sponsorshipID=''
    debugger;
    this.user.gelocaldata(this.user.EMAIL_TOKEN_KEY).then(datares=>{
      paypostobj.tempelobj.email=datares
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(datares=>{
        paypostobj.tempelobj.userid=datares
        this.user.paypalrespo(paypostobj).subscribe((resp)=>{
          //  this.servicelistobj=resp
          //this.router.navigate(['pages/e-commerce/donation-list']);
           // console.log(JSON.stringify(resp))
           //this.showSuccess = true;
         });
      })
    })
        

        


            alert('Transaction completed by ' + details.payer.name.given_name + '!');
          })
          .catch(err => {
            console.log(err);
          })
          //this.API
          

      }
    }).render('#donation_itemid_'+ival);
  }, 500)
}
//////////////////////////////

  ionViewWillLeave()
  {
   
  
      this.tabBarElement.style.display =null;

  }
  openModulegalery(){
    this.navCtrl.push('GalleryPage',{EventsID:this.item.EventsID});
  }

  // subscribedfunction(){
  //   //userid=1&templeid=3&action=s
  //   this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
  //     let tempuserobj:{userid:string,EventsID:string,action:string}={
  //       userid:data,
  //       EventsID:this.item.EventsID,
  //       action:'s'
  //     }
      
  //     this.user.scribedfunction(tempuserobj).subscribe(data=>{
       
  //     })
  //     this.issubscribe=true
  //   })
    
    
  // }
  // openmapfunction(push){

  // }
  getSantizeUrl(url : string) { 


    return this.sanitizer.bypassSecurityTrustHtml(url)
}
  unsubscribedfunction(){
    //userid=1&templeid=3&action=s
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      let tempuserobj:{userid:string,EventsID:string,action:string}={
        userid:data,
        EventsID:this.item.EventsID,
        action:'u'
      }
      this.user.scribedfunction(tempuserobj).subscribe(data=>{
   
      })
      this.issubscribe=false;
    })
    
    
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
socialShareFunction(socialShareFunction){
 
  this.socialSharing.share(socialShareFunction, null, null, null);
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
  // this.navCtrl.push('ServicedetailPage', {
  //   serviceobj: Servicedetailobj
  // });
  debugger;
  this.pginfo.ExternalURL=Servicedetailobj.OBURL;
  this.pginfo.MenuName=Servicedetailobj.ServiceTitle;
  this.navCtrl.push('CommonPage', {
    page:this.pginfo

});
}


openDonationPage(Pagename,sponsorshipobj){
  this.navCtrl.push(Pagename, {
    sponsorshi_pobj:sponsorshipobj,donationtype:'sponsorship'

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
  this.item.TempleName=this.templeName;
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

  
    this.navCtrl.push('DonationPage',{'pageinfoObj':this.item,'donationtype':'Event'})
  }
  
    
    openCommonModule(controllername,pagetype){
      this.requestobj.pagetype=pagetype;
            this.requestobj.appid=this.user.APPID
            this.requestobj.clientid=this.user.CLIENTID
            this.requestobj.roleid=this.user.ROLE_ID_TOKEN_KEY
            this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
              this.requestobj.singleTempleID=res
              this.storage.get(this.user.USER_ID_TOKEN_KEY).then(userid => {
                this.requestobj.userid=userid;
                this.user.get_adsobj(this.requestobj).subscribe(data=>{
                  console.log(this.requestobj);
                  //data.pgtitle='Event Calendar'
                  this.navCtrl.push(controllername, {
                    pagetype: pagetype,pg_content:data,
                  });
               })
      
      
              })
            })
     
    }
  
}

