import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { User } from '../../providers/user/user'
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the AddedtemplemoredetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//declare var paypal: any;
@IonicPage()
@Component({
  selector: 'page-addedtemplemoredetail',
  templateUrl: 'addedtemplemoredetail.html',
})
export class AddedtemplemoredetailPage {
  pageinfoobj: any;
  imagelocation: any;
  templeaddress:any;
  tabBarElement: any;
  paymentAmount=1;
  def_lang:{val:string}={val:'English'}
  // payPalConfig = {
  //   env: 'sandbox',
  //   client: {
  //     sandbox: 'Aa9FbMGhZdA__JbQzX91dQ0WwPZmv6SWRjvvpskBPV1zWsI2BV3mTtBdirnqQrOjxsy2CcSwMLa3cR54',
  //   },
  //   commit: false,
  //   payment: (data, actions) => {
  //     console.log("data is", data, actions);
  //     return actions.payment.create({
  //       payment: {
  //         transactions: [
  //           { amount: { total: this.paymentAmount, currency: 'USD' } }
  //         ]
  //       }
  //     });
  //   }
  // }
  postdata:{TempleID:string}={TempleID:''};
  publicUnpublishobj:{ roleid: any, clientid:string, appid:string,userID:string,templeID:string,ispublush:string} = {    
    roleid: '',
    clientid: "",
    appid: "",
    templeID:'',
    userID:"",
    ispublush:''
  }
  account: { clientid:string, appid:string,templeid:string,lang:string} = {
    clientid: "",
    appid: "",
    templeid:'',
    lang:'',
  };
  templeimage: any;
  languageobj: ArrayBuffer;
  pages: { MenuName: string; component: string; }[];
  username: string;
  //private fb: Facebook,
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,public navParams: NavParams,public user:User,private payPal: PayPal,private googlePlus: GooglePlus,public events: Events) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.imagelocation=user.IMAGELOCATION;
    this.pageinfoobj=navParams.get('item');
    this.postdata.TempleID=this.pageinfoobj.TempleID;
    this.account.appid=user.APPID
    this.account.clientid=user.CLIENTID;
    this.account.templeid=this.pageinfoobj.TempleID;
    
    this.user.gelocaldata(user.USER_ID_TOKEN_KEY).then(resp=>{
      this.publicUnpublishobj.userID=resp
      this.publicUnpublishobj.appid=user.APPID
      this.publicUnpublishobj.clientid=user.CLIENTID
      this.publicUnpublishobj.roleid=user.ROLE_ID_TOKEN_KEY
      this.publicUnpublishobj.templeID=this.pageinfoobj.TempleID

    })
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"LANGUAGE"
    };    

    this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
      this.languageobj=data;
    })
  }


  ionViewWillEnter()
    {
      this.user.presentLoadingCustom();
      this.user.gettempleaddressdetails(this.postdata).subscribe((respdata)=>{
        this.templeaddress=respdata[0]['address'];
        this.templeimage=respdata[0]['ImageURL'];
        this.user.loaderdismiss();
      }) 
      this.tabBarElement.style.display = 'none';
    }
    ionViewWillLeave()
    {
      if(this.tabBarElement.style.display){
        this.tabBarElement.style.display =null;
      }
       
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddedtemplemoredetailPage');
  }

  
  getSelectedLang($event){
    this.def_lang.val=$event;
    this.account.lang=$event;
    let quriparmobj:{templeiID:string,lang:string}={templeiID:this.pageinfoobj.TempleID,lang:this.def_lang.val}
   this.user.get_Temple_By_ID_lang(quriparmobj).subscribe(resp=>{
    this.pageinfoobj=resp
    //this.gettempleservice(this.items);
   // this.gettempleeventByTemple();
   })
  }
  openModule(componentName:any){
    debugger;
    this.navCtrl.push(componentName,{'item':this.pageinfoobj});
  }
  openimagegall(componentName){
    //this.pageinfoobj.ImageURL=null;
    this.navCtrl.push(componentName,{'imagegall':this.pageinfoobj});
  }


  // payButtonHandler() {
  //   console.log(paypal);

  //   paypal.Buttons(this.payPalConfig).render('#paypal-button');
  // }

  publishtemple(dataobj,actiontemp){
    this.publicUnpublishobj.ispublush=actiontemp
    let alert = this.alertCtrl.create({
      title: 'Confirm '+actiontemp,
      message: 'Do you want '+actiontemp+' this Temple?',
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
              this.pageinfoobj.active=1;
            }else{
              this.pageinfoobj.active=0;
            }
           // this.publicUnpublishMethod(this.publicUnpublishobj) uncommment and change in method
            console.log('Yes clicked',this.publicUnpublishobj);
          }
        }
      ]
    });
    alert.present();



  }
  logoutFunction(){
    //this.storage.set('Logintype','Google')
    this.user.gelocaldata('Logintype').then(loginTyperesp=>{
      if(loginTyperesp=='Google'){
        this.googlePlus.logout()
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      }else if(loginTyperesp=='Facebook'){
        // this.fb.logout()
        // .then(res => {
        //   console.log(res);
        // })
        // .catch(err => console.log(err));
      }else{

      }
    })    
    this.user.logout().then(res => {
          
      this.pages = [
        { MenuName: 'Login', component: 'LoginPage' },
        { MenuName: 'Signup', component: 'SignupPage' },
       
      ];
      //this.username='';
      this.username='';
      this.events.publish('menu:created', this.pages, Date.now());
      this.navCtrl.setRoot('LoginPage');
    });
  }
  

  initPayPal(){
    debugger;
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'Aa9FbMGhZdA__JbQzX91dQ0WwPZmv6SWRjvvpskBPV1zWsI2BV3mTtBdirnqQrOjxsy2CcSwMLa3cR54'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('0.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((paypalresp) => {

          console.log('paypalresp',paypalresp)
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
  }
  
}
