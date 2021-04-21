import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User,Items } from '../../providers';
import * as enLocale from 'date-fns/locale/en';
//import * as frLocale from 'date-fns/locale/fr';
import { DatepickerOptions } from 'ng2-datepicker';
/**
 * Generated class for the AddseventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-addsevent',
  templateUrl: 'addsevent.html',
})
export class AddseventPage {
  date: Date;
  calendarOptions : DatepickerOptions = {
    locale: enLocale,
    displayFormat: 'MM/DD/YYYY',
  barTitleFormat: 'MMMM YYYY',
  dayNamesFormat: 'dd',
  firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'From date',
    placeholder: 'From date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  
  };
  c_options : DatepickerOptions = {
    locale: enLocale,
    displayFormat: 'MM/DD/YYYY',
  barTitleFormat: 'MMMM YYYY',
  dayNamesFormat: 'dd',
  firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'To date',
    placeholder: 'To date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  
  };
  addtemplelfirst: FormGroup;
  public account:{EventsTitle:string,EventsType:string,EventsLongDesc:string,EventsShortDesc:string,appid:string,clientid:string,userid:number,EventsID:string,TempleID:number,F_EventsDate:string,t_EventsDate:string,Photoalubumname:string,PhotoAlbumURL:string,Videoalubumname:string,VideoAlbumURL:string,lang:string,isvolunteering:string,  isDonation:string
  
  }={EventsTitle:'',EventsType:'',EventsLongDesc:'',EventsShortDesc:'', appid:'',
  clientid:'',
  VideoAlbumURL:'',
  userid:null,
  Videoalubumname:'',EventsID:'',
  TempleID:null,F_EventsDate:'',Photoalubumname:'',PhotoAlbumURL:'',
  t_EventsDate:'',
  lang:'',
  isvolunteering:'Yes',
  isDonation:'Yes'
}

languageobj: ArrayBuffer;
  tabBarElement: any;
  isupdate: boolean;
  EventsID:string;
  templeserviceobj: ArrayBuffer;
  templeserviceListobj: ArrayBuffer;
  def_lang:{val:string}={val:''}

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,public items:Items) {
    

    this.date = new Date();
    this.user.presentLoadingCustom();
    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"POOJA_SERVICE"
    };
    
    this.user.getSearchConfig(servicetypeParmObj).subscribe((resp) => {
      this.templeserviceListobj=resp;
      this.user.loaderdismiss();
     })
     
      servicetypeParmObj.configtype="LANGUAGE"
        
      this.user.gelocaldata(this.user.LANG).then(data=>{
        debugger;
        this.def_lang.val=data;
        this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
          this.languageobj=data;
        })
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
      this.EventsID=updatewithobj.EventsID
      this.account.EventsID=updatewithobj.EventsID
      this.account.TempleID=updatewithobj.TempleID
        this.account.EventsTitle=updatewithobj.EventsTitle;
        this.account.EventsType=updatewithobj.EventsType;
        this.account.EventsLongDesc=updatewithobj.EventsLongDesc;
        this.account.EventsShortDesc=updatewithobj.EventsShortDesc;
        this.account.F_EventsDate=updatewithobj.F_EventsDate;
        this.account.Photoalubumname=updatewithobj.photo_album_page_name;
        this.account.PhotoAlbumURL=updatewithobj.photo_album_page_url;
        this.account.Videoalubumname=updatewithobj.video_album_page_name;
        this.account.VideoAlbumURL=updatewithobj.video_album_page_url;
        this.account.isvolunteering=updatewithobj.isvolunteering;
        this.account.isDonation=updatewithobj.isDonation;
        this.account.F_EventsDate=updatewithobj.EventFromDate
        this.account.t_EventsDate=updatewithobj.EventToDate;
        this.isupdate=true;

        
        //this.validatorfunction();
    }else{
      //this.validatorfunction();
      debugger;

      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.account.userid=data;
        let tempobj= this.navParams.get('item');
        this.account.TempleID=tempobj.TempleID;
        this.user.gelocaldata('addtempleevent').then(resp=>{
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
    

    
    this.validatorfunction();
  }
  getSelectedLang($event){
    this.def_lang.val=$event;
    this.account.lang=$event;
    debugger;
    // let quriparmobj:{templeiID:number,lang:string}={templeiID:this.account.TempleID,lang:this.def_lang.val}
    if(this.isupdate){
      this.user.gettempleeventsby_lang_admin(this.account).subscribe(resp=>{
        let temparray:any=resp;
       this.account.EventsTitle=temparray.EventsTitle;
       this.account.EventsShortDesc=temparray.EventsShortDesc;
       this.account.EventsLongDesc=temparray.EventsLongDesc;
       this.account.isvolunteering=temparray.isvolunteering;
       this.account.isDonation=temparray.isDonation;
      })
    }
   
  }
  
  validatorfunction(){
    this.addtemplelfirst = new FormGroup({
        
      EventsTitle: new FormControl(this.account.EventsTitle, [Validators.required, Validators.minLength(2)]),
      EventsShortDesc: new FormControl(this.account.EventsShortDesc, [Validators.required, Validators.minLength(2)]),
      F_EventsDate: new FormControl(this.account.F_EventsDate, [Validators.required]),
      t_EventsDate: new FormControl(this.account.t_EventsDate, [Validators.required]),
      Photoalubumname: new FormControl(this.account.Photoalubumname),
      PhotoAlbumURL: new FormControl(this.account.PhotoAlbumURL),
      
      Videoalubumname: new FormControl(this.account.Videoalubumname),
      VideoAlbumURL: new FormControl(this.account.VideoAlbumURL),
      isvolunteering: new FormControl(this.account.isvolunteering),
      isDonation: new FormControl(this.account.isDonation),
      EventsType: new FormControl(this.account.EventsType, [Validators.required]),
      EventsLongDesc: new FormControl(this.account.EventsLongDesc),
    })
  }
  get EventsLongDesc(): string {
		return this.addtemplelfirst.value['EventsLongDesc'];
  }
  get EventsType(): string {
		return this.addtemplelfirst.value['EventsType'];
  }
  get EventsTitle(): string {
		return this.addtemplelfirst.value['EventsTitle'];
  }
  get EventsShortDesc(): string {
		return this.addtemplelfirst.value['EventsShortDesc'];
  }
  get F_EventsDate(): string {
		return this.addtemplelfirst.value['F_EventsDate'];
  }
  get t_EventsDate(): string {
		return this.addtemplelfirst.value['t_EventsDate'];
  }
  get Photoalubumname(): string {
		return this.addtemplelfirst.value['Photoalubumname'];
  }
  get PhotoAlbumURL(): string {
		return this.addtemplelfirst.value['PhotoAlbumURL'];
  }



  get Videoalubumname(): string {
		return this.addtemplelfirst.value['Videoalubumname'];
  }
  get VideoAlbumURL(): string {
		return this.addtemplelfirst.value['VideoAlbumURL'];
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
    console.log('ionViewDidLoad AddseventPage');
  }

  doFormSubmit(){
    if(this.isupdate){
      let  userinfo:any[]=[];
      let tempformdataobj:{
        isDonation:string,
        isvolunteering:string,
        EventsTitle:string,EventsType:string,EventsLongDesc:string,EventsShortDesc:string,appid:string,clientid:string,userid:number,TempleID:number,EventsID:string,F_EventsDate:string,t_EventsDate:string,Photoalubumname:string,PhotoAlbumURL:string,VideoAlbumURL:string,Videoalubumname:string,lang:string
      }={
        isDonation:this.account.isDonation,
        isvolunteering:this.account.isvolunteering,
        EventsTitle:this.account.EventsTitle,EventsType:this.account.EventsType,EventsLongDesc:this.account.EventsLongDesc,EventsShortDesc:this.account.EventsShortDesc,appid:this.account.appid,clientid:this.account.clientid,userid:this.account.userid,TempleID:this.account.TempleID,EventsID:this.EventsID,F_EventsDate:this.account.F_EventsDate,t_EventsDate:this.account.t_EventsDate,Photoalubumname:this.account.Photoalubumname,PhotoAlbumURL:this.account.PhotoAlbumURL, VideoAlbumURL:this.account.VideoAlbumURL,Videoalubumname:this.account.Videoalubumname,lang:  this.def_lang.val
      }
      userinfo.push(tempformdataobj);
      debugger;
      this.user.templeeventupdate(tempformdataobj).subscribe((resp)=>{
        
        // let toast = this.toastCtrl.create({
        //   message: "Temple details  successfully updated",
        //   duration: 3000,
        //   position: 'top'
        // });
        // toast.present();
        //this.openmodule('AddedtemplePage'); 
        this.navCtrl.pop();
      });      

    }else{
    // debugger;
    console.log(JSON.stringify(this.account));
    this.user.setlocaldata('addtempleevent',this.account);
    // let toast = this.toastCtrl.create({
    //   message: "Event  details added successfully",
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
    //this.openmodule('AddseventtimelistPage'); 
    this.openmodule('AddPaymentUrlListPage'); 
    
  }//else close 
  

    }

    openmodule(modulename){   
      this.navCtrl.push(modulename,{'formdata':this.account})
  
    }
}
