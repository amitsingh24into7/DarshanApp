import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage,Nav, NavController, NavParams,  Events, ModalController } from 'ionic-angular';
import { User } from '../../providers';
import { Settings } from '../../providers';
import { ModalPage} from '../modal/modal';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook } from '@ionic-native/facebook';
import {ChangePassPage } from '../change-pass/change-pass'
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProfiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-profie',
  templateUrl: 'profie.html',
})
export class ProfiePage {
  @ViewChild(Nav) nav: Nav;
  options: any;
  pages: any[] = [ ];
  settingsReady = false;
  username: any;
  form: FormGroup;
  userLang=''
  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subProfiePage: any = ProfiePage;
  
  requestobj: { roleid: any, clientid:string,singleTempleID:string, appid:string,lang:string,userid:string,pagetype:string} = {
    singleTempleID:'',
    roleid: '',
    clientid: "",
    appid: "",
    lang:"",
    userid:"",
    pagetype:''
  };
  //---------------*********userinfo*********--------------
  account: { username: string, email: string,userid:string,  appid: string,clientid:string } = {
    username: '',
    email: '',
    userid:'',
  
    appid:'',
    clientid:''
  };
  updateErrorString: any;
  tabBarElement: any;
  constructor(public navCtrl: NavController,
    public settings: Settings, public user: User,
    public formBuilder: FormBuilder,
    private storage: Storage,
    public navParams: NavParams,
    public events: Events,
    private googlePlus: GooglePlus,
    //private fb: Facebook,  
    public modalCtrl: ModalController,
    public translate: TranslateService) {
      
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    user.gelocaldata(user.EMAIL_TOKEN_KEY).then(res => {
      this.account.email=res;    
        
    })
    user.gelocaldata(user.TOKEN_KEY).then(res => {
      this.account.username=res; 
      this.account.userid=res;   
    })
    user.gelocaldata(user.LANG).then(res=>{
      this.userLang=res;
    })
    
   
    this.account.appid=user.APPID;
    this.account.clientid=user.CLIENTID;
  }

  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    };

    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          option4: [this.options.option4]
        };
        break;
    }
    

    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  editprofile(){
    this.navCtrl.push('EditprofiePage')
  }
  openSubscribelist(){
    this.navCtrl.push('TemplesPage',{
      subscribelist:'subscribelist'
    })
  }
  openModule(){
    
    this.navCtrl.push('MycartPage')
  }

  openMyFamilyListPage(){
    this.navCtrl.push('MyFamilyListPage')
  }
  changepass(){
    let searchModal = this.modalCtrl.create(ChangePassPage);
  searchModal.onDidDismiss(data => {
    console.log("SEARCH MODEL Dismiss:==",data);
  });
  searchModal.present();
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
  ionViewDidLoad() {
    // Build an empty form for the template to render
   /* document.addEventListener("backbutton",function(e) {
      console.log("disable back button")
    }, false);*/
    this.form = this.formBuilder.group({});
  }
  
  c_openCommonModule(controllername,pagetype){
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
  languagemodel(){
    let searchModal = this.modalCtrl.create(ModalPage);
     searchModal.onDidDismiss(data => {
    console.log("SEARCH MODEL Dismiss:==",data);
     });
     searchModal.present();
  }
  openmapPage(){
      this.navCtrl.push('GooglemapPage');
  }
  updateProfile(){
    
    // Attempt to login in through our User service
    this.user.updateProfileServ(this.account).subscribe((resp) => {
     //this.navCtrl.push(MainPage);
     //this.events.publish('user:created', resp, Date.now());// Update  menu of all user info  
    //  let toast = this.toastCtrl.create({
    //   message: resp.status,
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
    }, (err) => {
      //this.navCtrl.push(MainPage);

      // Unable to sign up
      // let toast = this.toastCtrl.create({
      //   message: err,
      //   duration: 3000,
      //   position: 'top'
      // });
      // toast.present();
    });
  }
  
  
  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
    this.tabBarElement.style.display = 'none';

  }
 
  ionViewWillLeave()
  {
   
  
      this.tabBarElement.style.display =null;

  }
  ngOnChanges() {
    console.log('Ng All Changes');
  }


  openCommonModule(controllername){
    
    this.navCtrl.push(controllername, {
      pagetype: 'myaddress'
    });
  }
}