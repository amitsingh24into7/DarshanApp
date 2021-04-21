import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ModalController } from 'ionic-angular';
import { User } from '../../providers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalPage} from '../modal/modal';
//import { FormGroup } from '@angular/forms';
import * as Q from 'quill';
import {Platform} from 'ionic-angular';

/**
 * Generated class for the AddtemplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const Quill: any = Q;
@IonicPage()
@Component({
  selector: 'page-addtemple',
  templateUrl: 'addtemple.html',
})
export class AddtemplePage {
  addtemplelfirst: FormGroup;
  isupdate=false;
  item_test: FormControl;
  def_lang:{val:string}={val:'English'}
  // private addtempleForm : FormGroup;
  account: { TempleName: string, ShortDesc: string,LongDesc:string,flag1:string,flag2:string, contactperson: string, contactno: number,contactemail:string, TempleAvalibility: string,appid:string,clientid:string,userid:number,TempleID:number,prefer_language:string,lang:string , facebook_clientID:string,
  paypal_clientID:string,
  youtube_channel_id:string} = {
    TempleName: '',
    ShortDesc: '',
    LongDesc:'',
    contactperson: '',
    contactno:null ,
    contactemail:'',
    TempleAvalibility:'',
    appid:'',
    flag1:'',
    flag2:'',
    clientid:'',
    userid:null,
    TempleID:null,
    prefer_language:'',
    lang:'',
    facebook_clientID:'',
    paypal_clientID:'',
    youtube_channel_id:''
  };
  tabBarElement: any;
  languageobj: ArrayBuffer;
  quill: any;
  iscore: boolean=false;
  
  
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams,public user:User,public platform: Platform) {

    let servicetypeParmObj: { clientid:string, appid:string,configtype:string} = {
      clientid: "",
      appid: "",
      configtype:"LANGUAGE"
    };    

    this.user.getSearchConfig(servicetypeParmObj).subscribe(data=>{
      this.languageobj=data;
    })
   
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    
        this.account.appid=this.user.APPID;
        this.account.clientid=this.user.CLIENTID;
       
        let updatewithobj:any;


        if(updatewithobj=this.navParams.get('item')){
          this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
            this.account.userid=data;
          })
          debugger;
            this.account.TempleName=updatewithobj.TempleName;
            this.account.LongDesc=updatewithobj.LongDesc;
            this.account.ShortDesc=updatewithobj.ShortDesc;
            this.account.TempleAvalibility=updatewithobj.TempleAvalibility;
            this.account.contactemail=updatewithobj.contactemail;
            this.account.contactno=updatewithobj.contactno;
            this.account.contactperson=updatewithobj.contactperson;
            this.account.TempleID=updatewithobj.TempleID;
            this.account.flag1=updatewithobj.Flex1;
            this.account.flag2=updatewithobj.Flex2;
            this.account.prefer_language=updatewithobj.language;
            this.account.facebook_clientID=updatewithobj.facebook_clientID,
            this.account.paypal_clientID=updatewithobj.paypal_clientID,
            this.account.youtube_channel_id=updatewithobj.youtube_channel_id
            
            this.isupdate=true;
            //this.item_test = this.formBuilder.control( this.account.LongDesc);
            //this.validatorfunction();
        }else{
          //this.validatorfunction();
          debugger;
          this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
            this.account.userid=data;
            this.user.gelocaldata('addtemplefirstlabel').then(resp=>{
              if(resp!=null){
                this.account=resp;
                this.account.userid=data;
                //this.item_test = this.formBuilder.control( this.account.LongDesc);
               // this.validatorfunction();
              }else{
               // this.validatorfunction();
              }
              
            })
          })
        }
        debugger;
       
  this.validatorfunction();
        
  
      }

      getSelectedLang($event){
        this.def_lang.val=$event;
        this.account.lang=$event;
        let quriparmobj:{templeiID:number,lang:string}={templeiID:this.account.TempleID,lang:this.def_lang.val}
       this.user.get_Temple_By_ID_lang(quriparmobj).subscribe(resp=>{
         let temparray:any=resp;
        this.account.TempleName=temparray.TempleName;
        this.account.LongDesc=temparray.LongDesc;
        this.account.ShortDesc=temparray.ShortDesc;
        
       })
      }


  ionViewDidLoad() {
    
    debugger
   if(this.platform.is('core')){
     this.iscore=true
   }
    //console.log(JSON.stringify(this.platform))
    console.log('ionViewDidLoad AddtemplePage');
  }


  ionViewWillEnter()
    {
      debugger
      this.quill = new Quill('#editor-container', {
        modules: {
          toolbar: [
            ['link'],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
           
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']       
          ]
        },
        handlers: {
          // handlers object will be merged with default handlers object
          'link': function(value) {
            if (value) {
              var href = prompt('Enter the URL');
              this.quill.format('link', href);
            } else {
              this.quill.format('link', false);
            }
          },
          
        },
        placeholder: 'Long Description',
        theme: 'snow'  // or 'bubble'
      });
      this.quill.container.firstChild.innerHTML = this.account.LongDesc
     // this.quill.insertHtml(0,  this.account.LongDesc, '', true);
        this.tabBarElement.style.display = 'none';
       // let ischange=false
        // this.quill.on('editor-change', function(d) {
        //   d.parent
        //   //this.account.LongDesc= this.quill.getText;
        //   })

          //this.quill.on('editor-change',this.tempfunction(this.account));
         // .apply(this)
         if(this.platform.is('core')){
          this.account.LongDesc= "&nbsp;"
         }
    }
    
  
    // tempfunction(account){
    //   debugger;
    //   alert()
    //   this.account.LongDesc=document.querySelector(".ql-editor").innerHTML;
    // //return this.quill.apply(this, document.querySelector(".ql-editor").innerHTML);
      
    // }

    ionViewWillLeave()
    {
             this.tabBarElement.style.display =null;


    }
  validatorfunction(){
    
    this.addtemplelfirst = new FormGroup({
        
      TempleName: new FormControl(this.account.TempleName, [Validators.required, Validators.minLength(2)]),

      ShortDesc: new FormControl(this.account.ShortDesc, [Validators.required, Validators.minLength(2)]),
      //LongDesc: new FormControl(this.account.LongDesc, [Validators.required, Validators.minLength(2)]),
      LongDesc: new FormControl(this.account.LongDesc),
      flag2: new FormControl(this.account.flag2),
      flag1: new FormControl(this.account.flag1),

      contactperson:new FormControl(this.account.contactperson, [Validators.required, Validators.minLength(2),Validators.maxLength(50)]),
      contactemail: new FormControl(this.account.contactemail, [Validators.required, Validators.email, Validators.minLength(3)]),
      
      contactno: new FormControl(this.account.contactno, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      // TempleAvalibility: new FormControl(this.account.TempleAvalibility, [Validators.required, Validators.minLength(2)]),
      prefer_language:new FormControl(this.account.prefer_language),
      facebook_clientID:new FormControl(this.account.facebook_clientID),
      paypal_clientID:new FormControl(this.account.paypal_clientID),
      youtube_channel_id:new FormControl(this.account.youtube_channel_id),

      
     
      })

  }


  get TempleName(): string {
		return this.addtemplelfirst.value['TempleName'];
	}
  get ShortDesc(): string {
		return this.addtemplelfirst.value['ShortDesc'];
  }
  get LongDesc(): string {
		return this.addtemplelfirst.value['LongDesc'];
  }
  get contactperson(): string {
		return this.addtemplelfirst.value['contactperson'];
  }
  get contactemail(): string {
		return this.addtemplelfirst.value['contactemail'];
  }
  get contactno(): string {
		return this.addtemplelfirst.value['contactno'];
  }
  // get TempleAvalibility(): string {
	// 	return this.addtemplelfirst.value['TempleAvalibility'];
  // }
  get prefer_language(): string {
		return this.addtemplelfirst.value['prefer_language'];
  }
  get youtube_channel_id(): string {
		return this.addtemplelfirst.value['youtube_channel_id'];
  }
  get paypal_clientID(): string {
		return this.addtemplelfirst.value['paypal_clientID'];
  }
  get facebook_clientID(): string {
		return this.addtemplelfirst.value['facebook_clientID'];
  }
  

  openmodule(modulename){   
    this.navCtrl.push(modulename,{'formdata':this.account})

  }
  
  alertmethod(){
    let searchModal = this.modalCtrl.create(ModalPage,{addtemple:"addtemple"});
    searchModal.onDidDismiss(resp => {
      console.log("SEARCH MODEL Dismiss:==",resp);
      let data=resp;
      debugger;
      if(this.account.prefer_language!=''){
        this.account.prefer_language='';
      }
      for (let index = 0; index < data.length; index++) {
            if(data.length-2>=index)
            {
            this.account.prefer_language+=data[index]+",";
          }else{
            this.account.prefer_language+=data[index];
          }
    }
  });
    searchModal.present();

  }
  doFormSubmit(tempval){
    if(tempval){
      debugger;
      if(this.isupdate){
        let  userinfo:any[]=[];
        //this.account.LongDesc=this.item_test.value
        if(this.platform.is('core')){
          this.account.LongDesc=this.quill.container.firstChild.innerHTML;
        }
       

        userinfo.push(this.account);
        debugger;
        this.user.templeupdate(userinfo).subscribe((resp)=>{
          
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
        console.log(JSON.stringify(this.account));
        if(this.platform.is('core')){
          this.account.LongDesc=this.quill.container.firstChild.innerHTML;
        }
      this.user.setlocaldata('addtemplefirstlabel',this.account);
      // let toast = this.toastCtrl.create({
      //   message: "Temple details added successfully",
      //   duration: 3000,
      //   position: 'top'
      // });
      // toast.present();
  
      this.openmodule('Addtemplelable2Page'); 
    }
    }
    

    }
    
  
}
