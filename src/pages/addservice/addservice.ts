import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User,Items } from '../../providers';

/**
 * Generated class for the AddservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addservice',
  templateUrl: 'addservice.html',
})
export class AddservicePage {
  addtemplelfirst: FormGroup;
  public account:{ServiceTitle:string,ServiceType:string,ServiceLongDesc:string,ServiceID:string,ServiceShortDesc:string,appid:string,clientid:string,userid:number,TempleID:number,ServiceAmount:number,ServiceAmount_office:number, ServiceCurrency:string,lang:string}={ServiceTitle:'',ServiceType:'',ServiceLongDesc:'',ServiceID:'',ServiceShortDesc:'', appid:'',
  clientid:'',
  userid:null,
  TempleID:null,ServiceAmount:null,
  ServiceAmount_office:null,
  ServiceCurrency:"",lang:''}
  
  tabBarElement: any;
  isupdate: boolean;
  serviceID:string;
  templeserviceobj: ArrayBuffer;
  templeserviceListobj: ArrayBuffer;
  currency: ArrayBuffer;
  def_lang:{val:string}={val:''}
  languageobj: ArrayBuffer;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,public items:Items) {
    this.user.presentLoadingCustom();
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"POOJA_SERVICE"
    };

    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.templeserviceListobj=resp;
      servicetypeParmObj.configtype="CURRENCY"
      this.user.getSearchConfig(servicetypeParmObj).subscribe((currencyresp) => {
        this.currency=currencyresp
        servicetypeParmObj.configtype="LANGUAGE"
        
      this.user.gelocaldata(this.user.LANG).then(data=>{
        debugger;
        this.account.lang=data
        this.def_lang.val=data;
        this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
          this.languageobj=data;
        })
      })
      })     
      this.user.loaderdismiss();
     })
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.account.appid=this.user.APPID;
    this.account.clientid=this.user.CLIENTID;
   
   let updatewithobj:any;
   debugger;
    
    if(updatewithobj=this.navParams.get('updateitem')){
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.account.userid=data;
      })
      this.serviceID=updatewithobj.ServiceID
        this.account.ServiceTitle=updatewithobj.ServiceTitle;
        this.account.ServiceType=updatewithobj.ServiceType;
        this.account.ServiceLongDesc=updatewithobj.ServiceLongDesc;
        this.account.ServiceShortDesc=updatewithobj.ServiceShortDesc;
        this.account.ServiceAmount=updatewithobj.ServiceAmount;
        this.account.ServiceAmount_office=updatewithobj.ServiceAmount_office;
        this.account.ServiceCurrency=updatewithobj.ServiceCurrency;
        this.account.TempleID=updatewithobj.TempleID
        this.account.ServiceID=updatewithobj.ServiceID
        this.isupdate=true;
        
        //this.validatorfunction();
    }else{
      //this.validatorfunction();
      debugger;

      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.account.userid=data;
        let tempobj= this.navParams.get('item');
        this.account.TempleID=tempobj.TempleID;
        this.user.gelocaldata('addtempleservice').then(resp=>{
          if(resp!=null){
            this.account=resp;
            this.account.userid=data;
           // this.validatorfunction();
          }else{
           // this.validatorfunction();
          }
          
        })
      })
    }


    // this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{ /////Use for service type
    //   let temelpobj= this.navParams.get('item');
    //   let serviceTypeuserinfo:{appid:string,clientid:string,userid:number,TempleID:number}={appid:this.user.APPID,clientid:this.user.CLIENTID,userid:data,TempleID:temelpobj.TempleID}
    //   debugger;
    //   this.items.gettempleservice(serviceTypeuserinfo).subscribe((resobj)=>{
    //     this.templeserviceobj=resobj;
        
    //   })
    // })
    
    this.validatorfunction();
  }

  validatorfunction(){
    this.addtemplelfirst = new FormGroup({
        
      ServiceTitle: new FormControl(this.account.ServiceTitle, [Validators.required, Validators.minLength(2)]),
      ServiceCurrency: new FormControl(this.account.ServiceCurrency, [Validators.required]),
      ServiceAmount: new FormControl(this.account.ServiceAmount, [Validators.required]),
      ServiceAmount_office: new FormControl(this.account.ServiceAmount_office, [Validators.required]),
      
      ServiceShortDesc: new FormControl(this.account.ServiceShortDesc),
      ServiceType: new FormControl(this.account.ServiceType, [Validators.required]),
      ServiceLongDesc: new FormControl(this.account.ServiceLongDesc),
    })
  }

  get ServiceCurrency(): string {
		return this.addtemplelfirst.value['ServiceCurrency'];
  }
  get ServiceLongDesc(): string {
		return this.addtemplelfirst.value['ServiceLongDesc'];
  }

  get ServiceAmount(): string {
		return this.addtemplelfirst.value['ServiceAmount'];
  }
  get ServiceAmount_office(): string {
		return this.addtemplelfirst.value['ServiceAmount_office'];
  }
  
  get ServiceType(): string {
		return this.addtemplelfirst.value['ServiceType'];
  }
  get ServiceTitle(): string {
		return this.addtemplelfirst.value['ServiceTitle'];
  }
  get ServiceShortDesc(): string {
		return this.addtemplelfirst.value['ServiceShortDesc'];
	}
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddservicePage');
  }
  getSelectedLang($event){
    this.def_lang.val=$event;
    this.account.lang=$event;
    debugger;
    // let quriparmobj:{templeiID:number,lang:string}={templeiID:this.account.TempleID,lang:this.def_lang.val}
    if(this.isupdate){
      this.user.gettempleserviceby_lang_admin(this.account).subscribe(resp=>{
        let temparray:any=resp;
       this.account.ServiceTitle=temparray.ServiceTitle;
       this.account.ServiceShortDesc=temparray.ServiceShortDesc;
       this.account.ServiceLongDesc=temparray.ServiceLongDesc;
       
      })
    }
   
  }
  doFormSubmit(){
    if(this.isupdate){
      let  userinfo:any[]=[];
      let tempformdataobj:{
        ServiceTitle:string,ServiceType:string,ServiceLongDesc:string,ServiceShortDesc:string,appid:string,clientid:string,userid:number,TempleID:number,ServiceID:string,ServiceAmount:number,ServiceAmount_office:number,ServiceCurrency:string,lang:string
      }={
        ServiceTitle:this.account.ServiceTitle,ServiceType:this.account.ServiceType,ServiceLongDesc:this.account.ServiceLongDesc,ServiceShortDesc:this.account.ServiceShortDesc,appid:this.account.appid,clientid:this.account.clientid,userid:this.account.userid,TempleID:this.account.TempleID,ServiceID:this.serviceID,ServiceAmount:this.account.ServiceAmount,ServiceAmount_office:this.account.ServiceAmount_office,ServiceCurrency:this.account.ServiceCurrency,lang:this.account.lang
      }
      userinfo.push(tempformdataobj);
      debugger;
      this.user.templeservicepdate(tempformdataobj).subscribe((resp)=>{
        
        // let toast = this.toastCtrl.create({
        //   message: "Temple details  successfully updated",
        //   duration: 3000,
        //   position: 'top'
        // });
        // toast.present();
        this.navCtrl.pop();
        //this.openmodule('AddedtemplePage'); 
      });            

    }else{
     debugger;
      console.log(JSON.stringify(this.account));
    this.user.setlocaldata('addtempleservice',this.account);
    // let toast = this.toastCtrl.create({
    //   message: "Temple details added successfully",
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
    
    this.openmodule('ServicetimelistPage'); 
  }//else close 

    }   
    openmodule(modulename){   
      this.navCtrl.push(modulename,{'formdata':this.account})
  
    }

}
