import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, Platform, ModalController } from 'ionic-angular';
import { User } from '../../providers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { DonationModelPage } from '../donation-model/donation-model';
/**
 * Generated class for the DonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donation',
  templateUrl: 'donation.html',
})
export class DonationPage {
 //   backButton: {
//     image: 'back',
//     imagePressed: 'back_pressed',
//     align: 'left',
//     event: 'backPressed'
// },
// forwardButton: {
//     image: 'forward',
//     imagePressed: 'forward_pressed',
//     align: 'left',
//     event: 'forwardPressed'
// },
isoption:any;
public options: ThemeableBrowserOptions = {
  statusbar: {
    color: '#ffffff',
  },
  toolbar: {
    height: 50,
    color: '#b74103',
  },
  
  closeButton: {
    wwwImage: 'assets/img/close.png',
    align: 'left',
    event: 'closePressed',
  },
};
  templeldonation: FormGroup;
postobjForDonation:any
currencyobj:ArrayBuffer;
public pagetitleNmae:string
public formobj:{Amount:string,Currency:string,Remarks:string}={Amount:'',Currency:'',Remarks:''}
  navefrom: any;
  tabBarElement: any;
  channelId: string;
  // private iab: InAppBrowser,
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, public navParams: NavParams,private payPal: PayPal,public user:User,private alertCtrl:AlertController,  public plt: Platform,public modalCtrl: ModalController,) {


    this.user.gelocaldata(this.user.SINGAL_TEMPLE_ID).then(res=>{
      debugger;
      this.user.get_thirdparty_clientID({TempleID:res,col_name:'paypal_clientID'}).subscribe(resp_foclient=>{
        this.channelId=resp_foclient.paypal_clientID;
        //this.searchPlaylists()
      })
    })

    
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.navefrom=this.navParams.get('donationtype')
    
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: this.user.CLIENTID,
      appid: this.user.APPID,
      configtype:"CURRENCY"
    };
    
debugger;
    
    if(this.postobjForDonation=this.navParams.get('pageinfoObj')){
      debugger;
      this.user.donateobj.templeName=this.postobjForDonation.TempleName
      if(this.postobjForDonation.EventsTitle){
        this.pagetitleNmae=this.postobjForDonation.EventsTitle;
        this.user.donateobj.eventName=this.postobjForDonation.EventsTitle;
        this.user.donateobj.eventid=this.postobjForDonation.EventsID
      }else if(this.postobjForDonation.title){
        this.pagetitleNmae=this.postobjForDonation.title;
      }else{
        this.pagetitleNmae='Donation'
      }     

      this.user.donateobj.templeid=this.postobjForDonation.TempleID
      // this.user.get_thirdparty_clientID({TempleID:this.postobjForDonation.TempleID,col_name:'paypal_clientID'}).subscribe(resp_foclient=>{
      //   this.channelId=resp_foclient.paypal_clientID;
      //   //this.searchPlaylists()
      // })
    }else if(this.postobjForDonation=this.navParams.get('formobjOfCheckout')){
      this.user.donateobj.productInfo=this.postobjForDonation.productobj
      //this.user.donateobj.Currency=
      //this.user.donateobj.sponsorshipID=this.postobjForDonation.ID
      // this.user.donateobj.Amount=
      // this.user.donateobj.Remarks=
    
      this.formobj.Currency=this.postobjForDonation.Currency
      this.formobj.Amount=this.postobjForDonation.Amount
    }
    else if(this.postobjForDonation=this.navParams.get('sponsorshi_pobj')){
      this.user.donateobj.eventid=this.postobjForDonation.EventID
      //this.user.donateobj.Currency=
      this.user.donateobj.sponsorshipID=this.postobjForDonation.ID
      // this.user.donateobj.Amount=
      this.pagetitleNmae=this.postobjForDonation.Details
      // this.user.donateobj.Remarks=
      this.formobj.Remarks=this.postobjForDonation.Remarks
      this.formobj.Currency=this.postobjForDonation.Currency
      this.formobj.Amount=this.postobjForDonation.Amount
      
//       ID: "7"
// EventID: "39"
// Details: "ksldjflskdf jslkdfj sldkfjsdlfs↵fsdf sd↵fjsd f↵sdfjsd↵ f↵sdf sdf"
// Amount: "0.6"
// Currency: "USD"
// Remarks: "yutuy tuyuyu"
// Createdby: "1"
// CreatedDate: "2020-01-23"

    }else if(this.postobjForDonation=this.navParams.get('pageinfoObj_forservice')){
     //this.formobj.Remarks=this.postobjForDonation.Remarks
      this.formobj.Currency=this.postobjForDonation.Currency
      this.formobj.Amount=this.postobjForDonation.Amount
      debugger;
      
    }else if(this.postobjForDonation=this.navParams.get('forservice')){
      debugger;
      //this.opne_Option_hmodel(this.postobjForDonation.ServiceID);
      this.pagetitleNmae=this.postobjForDonation.ServiceTitle;
      this.user.donateobj.serviceNmae=this.postobjForDonation.ServiceTitle;
      this.user.donateobj.templeName=this.postobjForDonation.TempleName
      this.user.donateobj.serviceid=this.postobjForDonation.ServiceID;
      //this.formobj.Remarks=this.postobjForDonation.ServiceLongDesc
      this.formobj.Currency=this.postobjForDonation.ServiceCurrency
      let comefrom=this.navParams.get('ServiceBooking')
      if(comefrom=='temple'){
        this.formobj.Amount=this.postobjForDonation.ServiceAmount
      }else{
        this.formobj.Amount=this.postobjForDonation.Service_Amount_Office
      }
      
    }
    ;   

    console.log(this.postobjForDonation);
    this.validatorfunction();
    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.currencyobj=resp;
    })
    console.log(this.currencyobj);
  }

  ionViewWillEnter() {
    let d_type=this.navParams.get('donationtype')
    let requestobj: {templeID:string,userID:string,serviceeventid:string,type:string}={templeID:'',userID:'',serviceeventid:'',type:''}
    if(d_type=='Service'){
     

      requestobj.templeID=this.postobjForDonation.TempleID
      requestobj.serviceeventid=this.postobjForDonation.ServiceID
      requestobj.userID=this.user.donateobj.userid
      requestobj.type=this.navParams.get('donationtype')
      this.user.get_service_event_option(requestobj).subscribe(respobj=>{
        if(respobj.length>0){
          let tempobj=this.navParams.get('forservice')
          this.opne_Option_hmodel(tempobj);
        }
      
      })
      
    } 
       
    
    //this.navParams.get('donationtype')
    this.tabBarElement.style.display = 'none';

  }
  ionViewWillLeave()
  {
   
  
      this.tabBarElement.style.display =null;

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DonationPage');
   
//     let  subtitle="Thanks For your vaulable support and payment"
// let msg="Your Transaction Refernce PAY-0DG64385AN258293<br>You can view All transaction details in MyBookings Section"
//     let alert = this.alertCtrl.create({
//       title: 'Success',
//       cssClass:"paymentalert",
//       subTitle:subtitle,
//       message:msg,
//       buttons: ['Ok']
//     });
//     alert.present();

  }
  validatorfunction(){
    
    this.templeldonation = new FormGroup({
     // Validators.maxLength(400)
       Currency: new FormControl('', [Validators.required, Validators.minLength(2)]),      
       Remarks: new FormControl('', [Validators.required, Validators.minLength(2)]), 
      Amount: new FormControl('', [Validators.required])
     
      })

  }
  
  get Amount(): string {
		return this.templeldonation.value['Amount'];
	}
  get Currency(): string {
		return this.templeldonation.value['Currency'];
  }
  get Remarks(): string {
		return this.templeldonation.value['Remarks'];
	}

  doFormSubmit(){
     if(this.templeldonation.value['Amount']==''){
      alert("Please Enter Amount");
      return false;
    }else if(this.templeldonation.value['Currency']==''){
      alert("Please Select Currency");
      return false;
    }else if(this.templeldonation.value['Remarks']==''){
      alert("Please Enter Remarks");
      return false;
    }else{
    this.user.donateobj.Remarks=this.formobj.Remarks
    this.user.donateobj.Currency=this.formobj.Currency
    this.user.donateobj.Amount=this.formobj.Amount
this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
this.user.donateobj.userid=resp;
this.user.donateobj.ItemDetails=this.navParams.get('donationtype');
this.user.gelocaldata(this.user.EMAIL_TOKEN_KEY).then(emilresp=>{
  this.user.donateobj.email=emilresp
  this.user.donateobj.username=this.user.USERNAME
  debugger;

  const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'paymentgateway/index.php?from=mobileadsapp&Amount='+this.formobj.Amount+'&Currency='+this.formobj.Currency+'&Remarks='+this.formobj.Remarks+'&email='+this.user.donateobj.email+'&userid='+this.user.donateobj.userid+'&username='+this.user.donateobj.username+'&ItemDetails='+this.user.donateobj.ItemDetails+'&ConfirmationBox='+this.user.donateobj.ConfirmationBox+'&templeid='+this.user.donateobj.templeid+'&templeName='+this.user.donateobj.templeName+'&serviceid='+this.user.donateobj.serviceid+'&serviceNmae='+this.user.donateobj.serviceNmae+'&eventid='+this.user.donateobj.eventid+'&eventName='+this.user.donateobj.eventName+'&sponsorshipID='+this.user.donateobj.sponsorshipID+'&productInfo='+this.user.donateobj.productInfo+'&isOption='+this.isoption, '_blank', this.options);

  //const browser = this.iab.create(this.user.IMAGELOCATION+'paymentgateway/index.php?from=mobileadsapp&Amount='+this.formobj.Amount+'&Currency='+this.formobj.Currency+'&Remarks='+this.formobj.Remarks+'&email='+this.user.donateobj.email+'&userid='+this.user.donateobj.userid+'&username='+this.user.donateobj.username+'&ItemDetails='+this.user.donateobj.ItemDetails+'&ConfirmationBox='+this.user.donateobj.ConfirmationBox+'&templeid='+this.user.donateobj.templeid+'&templeName='+this.user.donateobj.templeName+'&serviceid='+this.user.donateobj.serviceid+'&serviceNmae='+this.user.donateobj.serviceNmae+'&eventid='+this.user.donateobj.eventid+'&eventName='+this.user.donateobj.eventName+'&sponsorshipID='+this.user.donateobj.sponsorshipID+'&productInfo='+this.user.donateobj.productInfo, '_blank', 'location=no,zoom=yes,enableViewportScale=yes,clearcache=yes,toolbar=no,usewkwebview=yes');
  debugger;
  console.log(JSON.stringify(browser));

//   if (this.plt.is('cordova')) {
//     browser.on('loadstop').subscribe(function (event) {
//       if(event.url=='https://motleystack.com/paymentgateway/index.php#close'){
//           browser.close();
//           this.navCtrl.pop();
//       }
//       //alert();
//   })
// }
  //this.initPayPal(this.formobj,this.user.donateobj)
  })
})
  }

  }  

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
  })
}
  initPayPal(amountobj,tempelobj){
    debugger;
    let tempoption:{
      PayPalEnvironmentProduction: string,
      PayPalEnvironmentSandbox: string
    }={
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: ''
    };
if(this.channelId){
  tempoption.PayPalEnvironmentSandbox=this.channelId
}
this.loadExternalScript("https://www.paypal.com/sdk/js?client-id=sb&commit=false&currency=INR").then(() => {

  this.payPal.init(tempoption).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment(amountobj.Amount, amountobj.Currency, amountobj.Remarks, 'sale');
      this.payPal.renderSinglePaymentUI(payment).then((paypalresp) => {

        console.log('paypalresp',paypalresp)

        let postobj={tempelobj:[],paypalresp:[]}={tempelobj:[],paypalresp:[]}
        postobj.paypalresp=paypalresp;
        postobj.tempelobj=tempelobj;
     
        this.user.paypalrespo(postobj).subscribe((resp)=>{
          if(resp.status!='fail'){
            let  subtitle=resp.status
            let bodymsg=resp.message+"<br>"+resp.message1;
            let alert = this.alertCtrl.create({
              title: 'Success',
              cssClass:"paymentalert",
              subTitle:subtitle,
              message:bodymsg,
              buttons: ['Ok']
            });
            alert.present();
          }else{
          
            let alert = this.alertCtrl.create({
              title: 'Fail',
              cssClass:"paymentalert",
              subTitle:resp.status,
              buttons: ['Ok']
            });
            alert.present();
          }
          
       
        });

        // let toast = this.toastCtrl.create({
        //   message: message,
        //   duration: timeduration,
        //   position: 'middle'
        // });
        // toast.present();
        console.log('posteddata: ',postobj);
      this.navCtrl.pop();
        
        // Successfully paid
  
        // Example sandbox response
        //
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }
      }, () => {
        // Error or render dialog closed without being successful
      });
    }, () => {
      // Error in configuration
    });
  }, () => {
    // Error in initialization, maybe PayPal isn't supported or something else
  });
})
  
  }


  opne_Option_hmodel(serviceID){
    let type=this.navParams.get('donationtype')
    let searchModal = this.modalCtrl.create(DonationModelPage, {requestobj: serviceID,type:type});
     searchModal.onDidDismiss(data=> {
       debugger;
       //console.log("SEARCH MODEL Dismiss:==",data);
        if(data=='close'){
          this.navCtrl.pop();
        }else{
          if(data!=null){
        this.isoption=data.id
        this.formobj.Amount=data.price
        //this.formobj.Remarks=data.optiondescription
        this.formobj.Remarks=data.optionname
       }
        }
       
                
     });
     searchModal.present();

  }



}

