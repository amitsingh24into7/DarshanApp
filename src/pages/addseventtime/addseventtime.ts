import { Component } from '@angular/core';
import { IonicPage,  NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../providers';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
/**
 * Generated class for the AddseventtimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 
@IonicPage()
@Component({
  selector: 'page-addseventtime',
  templateUrl: 'addseventtime.html',
})
export class AddseventtimePage {
 
  addtempleServicetime: FormGroup;
  accountlabelobj:{clientid:string, appid:string,templeid:string,eventtimeid:string,Day:string,FromTime:string,ToTime:string,userid:string,timzone:string,Details:string,Remarks:'', servicetimeid:string,EventsDate:string,EventsType:string}={clientid:'',appid:'',templeid:'',eventtimeid:'',Day:'',FromTime:'',ToTime:'',userid:'',timzone:'',Details:'',Remarks:'', servicetimeid:'',EventsDate:'',EventsType:''}
  public labledataobj:any[]=[];
 
localdatatiming:any[]=[]
  isupdate: boolean;
  isaddnewtime: boolean;
  tabBarElement: any;
  dayNameObj: ArrayBuffer;
  nameofday:any;
  temple_def_t_zone:any;  

  
  date: Date;
  optionstime: DatepickerOptions = {
    locale: enLocale,
    displayFormat: 'MM/DD/YYYY',
  barTitleFormat: 'MMMM YYYY',
  dayNamesFormat: 'dd',
  firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User) {
    this.date = new Date();
    this.user.gelocaldata('addtempleevent').then(rest=>{
      if(rest){
        debugger
       let templeID:{TempleID:string}={TempleID:rest.TempleID}

        this.user.get_temple_tine_zone(templeID).subscribe((resp)=>{
          this.temple_def_t_zone=resp
          //this.accountlabelobj.timzone='America/Los_Angeles';
          this.accountlabelobj.timzone=this.temple_def_t_zone.temple_def_time_zone
          // this.addtempleServicetime = fb.group({
          //   timzone: this.temple_def_t_zone.temple_def_time_zone,
          // });

        })
        
        this.accountlabelobj.EventsDate=rest.F_EventsDate;
      }
      
      //var d = new Date(this.accountlabelobj.EventsDate);
      //this.nameofday= d.getDay();
     // alert(this.nameofday);
      var event = new Date(this.accountlabelobj.EventsDate);
var options = { weekday: 'long' };
this.accountlabelobj.Day=event.toLocaleDateString('en-US', options)

//console.log(event.toLocaleDateString('en-US', options));
//alert(event.toLocaleDateString('en-US', options));
      //var n = d.getDay();
    })

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
      debugger;
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
        this.accountlabelobj.EventsDate=updatewithobj.EventsDate
        this.accountlabelobj.eventtimeid=updatewithobj.EventsID
        this.accountlabelobj.templeid=updatewithobj.TempleID
      })      
            

       
        this.isupdate=true;
        
        
    }else if(updatewithobj=this.navParams.get('addnewformdata')){
      



      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.accountlabelobj.userid=data;
        // this.accountlabelobj.servicetimeid=updatewithobj.ID;
        this.accountlabelobj.appid=this.user.APPID
        this.accountlabelobj.clientid=this.user.CLIENTID
        // this.accountlabelobj.Day=updatewithobj.Day
        // this.accountlabelobj.Details=updatewithobj.Details
        // this.accountlabelobj.FromTime=updatewithobj.FromTime
        // this.accountlabelobj.ToTime=updatewithobj.ToTime
        // this.accountlabelobj.Remarks=updatewithobj.Remarks        
        // this.accountlabelobj.timzone=updatewithobj.timzone
        // this.accountlabelobj.EventsDate=updatewithobj.EventsDate
        this.accountlabelobj.EventsType=updatewithobj.EventsType
        this.accountlabelobj.eventtimeid=updatewithobj.EventsID
        this.accountlabelobj.templeid=updatewithobj.TempleID
        debugger;
      })      
            
       
        this.isaddnewtime=true;
    }
    else{
      this.labledataobj.push(navParams.get('formdata'));

   }

   this.validatorfunction();
  }
  validatorfunction(){
    this.addtempleServicetime = new FormGroup({      
        
      EventsDate: new FormControl(this.accountlabelobj.EventsDate, [Validators.required, Validators.minLength(2)]),
      Day: new FormControl(this.accountlabelobj.Day, [Validators.required, Validators.minLength(2)]),
      FromTime: new FormControl(this.accountlabelobj.FromTime),
      ToTime: new FormControl(this.accountlabelobj.ToTime),
      timzone: new FormControl(this.accountlabelobj.timzone, [Validators.required]),
      
      Details: new FormControl(this.accountlabelobj.Details ),
      Remarks: new FormControl(this.accountlabelobj.Remarks),
    })
  }
  


  
  get EventsDate(): string {
		return this.addtempleServicetime.value['EventsDate'];
  }
  get Remarks(): string {
		return this.addtempleServicetime.value['Remarks'];
  }
  get Details(): string {
		return this.addtempleServicetime.value['Details'];
  }
  // get timzone(): string {
	// 	return this.addtempleServicetime.value['timzone'];
  // }
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

  datevalue(ev){
    debugger;
    var event = new Date(ev);
    var options = { weekday: 'long' };
    this.accountlabelobj.Day=event.toLocaleDateString('en-US', options)
    //alert(ev.month+"/"+ev.day+"/"+ev.year)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddseventtimePage');
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
  //   this.user.setlocaldata('addtempleeventtime',this.accountlabelobj);
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
        //  let temprequestobj:any[]=[];
        //  temprequestobj.push(this.accountlabelobj)
        this.user.updateEventtiming(this.accountlabelobj).subscribe((respdata)=>{
          // let toast = this.toastCtrl.create({
          //         message: respdata.status,
          //         duration: 3000,
          //         position: 'top'
          //       });
          //       toast.present();
            this.navCtrl.pop();
            //this.navCtrl.pop(); 
            
            
        })
      }else if(this.isaddnewtime){
        this.user.addEventtimingbyeventID(this.accountlabelobj).subscribe((respdata)=>{
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
        this.navCtrl.push('AddseventtimelistPage',{'formdatatimelist':this.accountlabelobj})
      }    

    }
}

