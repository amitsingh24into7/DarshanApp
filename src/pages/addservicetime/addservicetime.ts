import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../providers';

/**
 * Generated class for the AddservicetimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addservicetime',
  templateUrl: 'addservicetime.html',
})
export class AddservicetimePage {
  addtempleServicetime: FormGroup;
  accountlabelobj:{ServiceType:string,clientid:string, appid:string,templeid:string,Day:string,FromTime:string,ToTime:string,userid:string,timzone:string,Details:string,Remarks:'', servicetimeid:string}={ServiceType:'',clientid:'',appid:'',templeid:'',Day:'',FromTime:'',ToTime:'',userid:'',timzone:'',Details:'',Remarks:'', servicetimeid:''}
  public labledataobj:any[]=[];
 
localdatatiming:any[]=[]
  isupdate: boolean;
  isaddservicetime:boolean;
  tabBarElement: any;
  dayNameObj: ArrayBuffer;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    let updatewithobj:any;
    debugger;
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"DAYS"
    };

    
    this.user.presentLoadingCustom();
    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.dayNameObj=resp;
      this.user.loaderdismiss();
     })


    if(updatewithobj=this.navParams.get('updateformdata')){
      debugger;
      
      // this.accountlabelobj:{clientid:string, appid:string,templeid:string,userid:string,ServiceID:string}={clientid:this.user.CLIENTID, appid:this.user.APPID,templeid:updatewithobj.TempleID,userid:'',ServiceID:updatewithobj.ServiceID}
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.accountlabelobj.userid=data;
        this.accountlabelobj.servicetimeid=updatewithobj.ID;
        this.accountlabelobj.appid=this.user.APPID
        this.accountlabelobj.clientid=this.user.CLIENTID
        this.accountlabelobj.Day=updatewithobj.Day
        this.accountlabelobj.Details=updatewithobj.Details
        this.accountlabelobj.FromTime=updatewithobj.FromTime
        this.accountlabelobj.ToTime=updatewithobj.ToTime
        this.accountlabelobj.Remarks=updatewithobj.Remarks        
        this.accountlabelobj.timzone=updatewithobj.timzone
       
      })      
            
       
        this.isupdate=true;
        
        
    }else  if(updatewithobj=this.navParams.get('addnewformdata')){
      debugger;
      
      // this.accountlabelobj:{clientid:string, appid:string,templeid:string,userid:string,ServiceID:string}={clientid:this.user.CLIENTID, appid:this.user.APPID,templeid:updatewithobj.TempleID,userid:'',ServiceID:updatewithobj.ServiceID}
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.accountlabelobj.userid=data;
        this.accountlabelobj.servicetimeid=updatewithobj.ServiceID;
        this.accountlabelobj.appid=this.user.APPID
        this.accountlabelobj.clientid=this.user.CLIENTID
        this.accountlabelobj.templeid=updatewithobj.TempleID
        this.accountlabelobj.ServiceType=updatewithobj.ServiceType
//         ServiceID: "48"
// TempleID: "105"
// ServiceType: "0"
// ServiceTitle: "dfsdffsdfsf"
// OBPageName: ""
// ServiceShortDesc: "sdfsdfsdf"
// ServiceLongDesc: "sdfsdfsdf"
// OBPossible: "0"
// OBURL: ""
// CreatedDate: "2020-01-18"
// CreatedBy: "1"
        //this.accountlabelobj.Day=updatewithobj.Day
        //this.accountlabelobj.Details=updatewithobj.Details
        //this.accountlabelobj.FromTime=updatewithobj.FromTime
        //this.accountlabelobj.ToTime=updatewithobj.ToTime
        //this.accountlabelobj.Remarks=updatewithobj.Remarks        
        //this.accountlabelobj.timzone=updatewithobj.timzone
       
      })      
            
       
        this.isaddservicetime=true;
        
        
    }
    else{
      this.labledataobj.push(navParams.get('formdata'));

   }

   this.validatorfunction();
  }
  validatorfunction(){
    this.addtempleServicetime = new FormGroup({
        
      
      Day: new FormControl(this.accountlabelobj.Day, [Validators.required, Validators.minLength(2)]),
      FromTime: new FormControl(this.accountlabelobj.FromTime, [Validators.required]),
      ToTime: new FormControl(this.accountlabelobj.ToTime, [Validators.required, Validators.minLength(2)]),
      timzone: new FormControl(this.accountlabelobj.timzone, [Validators.required, Validators.minLength(2)]),
      
      Details: new FormControl(this.accountlabelobj.Details),
      Remarks: new FormControl(this.accountlabelobj.Remarks ),
    })
  }
  
  get Remarks(): string {
		return this.addtempleServicetime.value['Remarks'];
  }
  get Details(): string {
		return this.addtempleServicetime.value['Details'];
  }
  get timzone(): string {
		return this.addtempleServicetime.value['timzone'];
  }
  get ToTime(): string {
		return this.addtempleServicetime.value['ToTime'];
  }
  get Day(): string {
		return this.addtempleServicetime.value['Day'];
  }
  get FromTime(): string {
		return this.addtempleServicetime.value['FromTime'];
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
    console.log('ionViewDidLoad AddservicetimePage');
  }

  // doFormSubmit(){
  //   debugger;
   
        
  //   if(this.isupdate){
  //     this.user.updateservicetiming(this.accountlabelobj).subscribe((respdata)=>{
  //       // let toast = this.toastCtrl.create({
  //       //         message: respdata.status,
  //       //         duration: 3000,
  //       //         position: 'top'
  //       //       });
  //       //       toast.present();             
  //             this.navCtrl.push('ServicetimelistPage');
  //     })

  //   }else{
  //   this.user.setlocaldata('addtempleservicetime',this.accountlabelobj);
  //   this.doFormSubmitForsave()
  //   this.user.gelocaldata('daymultipletime').then(reap=>{     
  //     if(!reap['templeservicetime']){
  //       let tempobj:{templeservicetime:any[]}={templeservicetime:[]}
  //       //tempobj.templeservicetime=reap;
  //       tempobj.templeservicetime.push(reap);
  //       this.labledataobj.push(tempobj);
  //     }else{
  //       this.labledataobj.push(reap);
  //     }
  //     this.user.removelocaldata('daymultipletime');
  //     this.navCtrl.push('AddtempleimgePage',{'formdata':this.labledataobj,'addservice':'addservice'})
  //     console.log(JSON.stringify(this.labledataobj));
  //   })
  //   }

    
   
  //   }    

    doFormSubmitForsave(){
     
       if(this.isupdate){
        this.user.updateservicetiming(this.accountlabelobj).subscribe((respdata)=>{
          // let toast = this.toastCtrl.create({
          //         message: respdata.status,
          //         duration: 3000,
          //         position: 'top'
          //       });
          //       toast.present();
            this.navCtrl.pop();
               
        })
      }else if(this.isaddservicetime){
        this.user.addServicetimengbyeventID(this.accountlabelobj).subscribe((respdata)=>{
          // let toast = this.toastCtrl.create({
          //         message: respdata.status,
          //         duration: 3000,
          //         position: 'top'
          //       });
          //       toast.present();
            this.navCtrl.pop();
               
        })
      }
      else{
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3))
        this.navCtrl.push('ServicetimelistPage',{'formdatatimelist':this.accountlabelobj})
      }
       
      
     

    }
  
}
