
/**
 * Generated class for the TemplesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 */

import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, MenuController, Platform, NavParams } from 'ionic-angular';
import{User} from '../../providers/user/user' 
import { Item } from '../../models/item';
import { Items } from '../../providers';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Events ,Nav} from 'ionic-angular';
import { CategoriesPage} from '../categories/categories';
//import { SearchmodelPage } from '../searchmodel/searchmodel';
//import { TabsPage } from "../tabs/tabs"
//import {TempleDetail} from '../'
export interface Slide {
  title: string;
  description: string;
  image: string;
}
@IonicPage()
@Component({
  selector: 'page-temples',
  templateUrl: 'temples.html',
})
export class TemplesPage {
  @ViewChild(Nav) nav: Nav;
  
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }

  
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad TemplesPage');
  // }
  
  account: {type:string, roleid: any, clientid:string, appid:string,lang:string,startfrom:number,searchobj:any,km:string,lat:string,lon:string,singleTempleID:string} = {
    type:'temple',
    roleid: '',
    clientid: "",
    appid: "",
    lang:'',
    startfrom:0,
    searchobj:[],
    singleTempleID:'',
    km:'20',
    lat:'-33.737885',
    lon:'151.235260'
  };
  public currentItems: Item[];
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  username: any;
  imagelocation:string='';
  geoAddress: any;
  allContacts: Item[];
  notiCount: string;
  isItemAvailable: boolean;
  searchobj: Item[];
  public searchInput:any;
  public filter_f:any;
  filterobj: { clientid:string, appid:string,configtype:string} = {
    clientid: "",
    appid: "",
    configtype:"SEARCHTEMPLE"
  };
  respfilterobj: ArrayBuffer;
  searchobjnew: ArrayBuffer;
  constructor(public user: User,
             public menu: MenuController,
                    translate: TranslateService,
              public platform: Platform,
              navParams: NavParams,
              public navCtrl: NavController,
              public storage: Storage,
              public items: Items, 
              public events: Events,
              
              
              public modalCtrl: ModalController) {
                this.filterobj.appid=this.user.APPID;
                this.filterobj.clientid=this.user.CLIENTID;
                  this.imagelocation=user.IMAGELOCATION;
                  this.user.getSearchConfig(this.filterobj).subscribe((resp) => {
                    this.respfilterobj=resp;
                    //this.user.loaderdismiss();
                   })
                  let userinfo:{clientid:string,appid:string,userid:string}={clientid:'',appid:'',userid:''};
                    userinfo.clientid=this.user.CLIENTID
                    userinfo.appid=this.user.APPID;
                    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
                      debugger;
                      userinfo.userid=data;
                      this.user.getNotification(userinfo).subscribe((data)=>{
                        let tempobj=data;
                      this.notiCount=tempobj.length
                      })
                    })

                  // if(navParams.get('filterservish')){
                  //   this.account.searchobj=navParams.get('filterservish');
                  // }
                  
                  if(navParams.get('subscribelist')=='subscribelist'){

                    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
                      let tempuserobj:{userid:string}={
                        userid:data
                         } 
                         this.user.scribedfunction(tempuserobj).subscribe((data:any)=>{
                          this.currentItems = data;
                          this.user.loaderdismiss();                         
                         })  
                        })
                  }else{
                    this.user.gelocaldata(this.user.SINGAL_TEMPLE_ID).then(data=>{
                       this.account.singleTempleID=data;
                      this.user.gelocaldata(this.user.LANG).then(res => {
                        this.account.lang=res;
                        let seq = this.items.getadds(this.account);
                      seq.subscribe((res: any) => {
                       // If the API returned a successful response, mark the user as logged in
                       
                         //console.log("909900990099090900909090909",JSON.stringify(res));
                        this.user.loaderdismiss();
                        this.currentItems=res
                                             
                        //  for (let item of items) {
                        //   this.currentItems.push(new Item(item));
                        // }
  
                      }, err => {
                        this.user.loaderdismiss();
                        console.error('ERROR', err);
                      });

                      })
                     
                      
                    })

                   
                  }
                   // let datalatlon=this.user.getlatlong();// GET  lat long
                     
                    // let seq = this.items.getadds(this.account);
                    // seq.subscribe((res: any) => {
                    //  // If the API returned a successful response, mark the user as logged in
                     
                    //    //console.log("909900990099090900909090909",JSON.stringify(res));
                    //    this.currentItems =res;
                       
                    //   //  for (let item of items) {
                    //   //   this.currentItems.push(new Item(item));
                    //   // }
                    // }, err => {
                    //   console.error('ERROR', err);
                    // });
                    // this.events.publish('currentItems:created', this.items.getadds(this.account), Date.now());
                    // console.log(JSON.stringify(this.currentItems));
                  // }else{
                  //   this.currentItems = this.items.getadds(this.account);
                  // }
                                   
                  
                  this.dir = platform.dir();
                   this.user.getgeolocation().then(res => {
                    this.geoAddress=res;
                   });
                 this.user.presentLoadingCustom();
                }
                
  // openModule(moduleName){
  //   alert(moduleName);
  //   this.navCtrl.push(moduleName, {
  //     item: ''
  //   });

  // }
  

  
  // opnesearchmodel(){
  //   let searchModal = this.modalCtrl.create(SearchmodelPage);
  //    searchModal.onDidDismiss(data => {
  //      console.log("SEARCH MODEL Dismiss:==",data);
  //    });
  //    searchModal.present();

  // }
  opencategories(){
    let searchModal = this.modalCtrl.create(CategoriesPage);
    searchModal.onDidDismiss(data => {
   console.log("SEARCH MODEL Dismiss:==",data);
    });
    searchModal.present();
  }
  getItems(ev: { target: { value: any; }; }) {
    let val = ev.target.value;
    debugger;
    this.allContacts=this.currentItems;   
    this.allContacts = this.allContacts.filter((location: { displayName: { toLowerCase: () => { indexOf: (arg0: any) => number; }; }; }) => {
      if(location.displayName){
        return location.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1;
      }
      
    });
    
  }


  searchTemple(ev: { target: { value: any; }; }) {
   
    let val = ev.target.value;
    debugger;
    if(!val){
      this.isItemAvailable = false;
    }
    if(ev.target.value.length>4){
      console.log(this.currentItems)
      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.searchobj =this.currentItems;   
        this.searchobj =  this.searchobj .filter((location: { TempleName: { toLowerCase: () => { indexOf: (arg0: any) => number; }; }; }) => {
        if(location.TempleName){
          return location.TempleName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        }
        
      });
      }
  }
    
  }
  // backEvent(){
  //   this.navCtrl.push("ListMasterPage", {
  //     item: ''
  //   });
  // }
  /**
   * The view loaded, let's query our items for the list
   
  ionViewDidLoad() {
    
  }
*/
  
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }  
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {    
    // this.navCtrl.push('ItemDetailPage', {
    //   item: item
    // });
    this.isItemAvailable = false;
   // alert(this.isItemAvailable);
    this.searchInput=item
    //this.isItemAvailable = false;
    //this.nav.setRoot()
  // this.navCtrl.setRoot(TempleDetail,{item:item});
  } 
  
  openModule(item){
    this.navCtrl.push('ItemDetailPage', {
       item: item
     });
  }
  searchByKeyword(event){
    debugger
    //if(this.filter_f!='' && this.searchInput!=''){
      this.isItemAvailable=false;
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(userdata=>{
        this.user.gelocaldata(this.user.SINGAL_TEMPLE_ID).then(templeid=>{
          this.user.get_search_result({searchType:this.searchInput,type:this.filter_f,userID:userdata,templeID:templeid}).subscribe(data=>{
            this.searchobjnew=data
          })
       })
    })
    
    // }else if(this.searchInput==''){
    //   alert("Please Enter Sum Key.")
    // }else if(this.filter_f==''){
    //   alert("Please select the type.")
    // }else{
    //   alert("Please Select and Enter Sum Key.")
    // }
    
 
  }  

/**
 * Below  Slider related method. 
 */
doRefresh(event) {
  console.log('Begin async operation');
 
  setTimeout(() => {
    console.log('Async operation has ended');
    this.events.publish('currentItems:created', this.items.doref(), Date.now());
    //this.items.doref();
    event.complete();
  }, 2000);
}
// startApp() {
//     this.navCtrl.setRoot('WelcomePage', {}, {
//       animate: true,
//       direction: 'forward'
//     });
//   }
  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    //this.menu.enable(true);
    debugger;
    // console.log(this.navCtrl.getViews());
   
   
  }

  ionViewDidLoad(){
    debugger;
    //this.user.loaderdismiss()
    if(this.navCtrl.getViews().length==1){
     
    //   let searchModal = this.modalCtrl.create(SearchmodelPage);    
    //  searchModal.onDidDismiss(data => {
    //   this.account.searchobj=data.filterservish;
    //    console.log("SEARCH MODEL Dismiss:==",data);
    //   // this.tab2Root ="TemplesPage"
    //  });
    //  searchModal.present();
    }
  }


  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
   // this.menu.enable(true);
  }
  doInfinite(): Promise<any> {
    
    console.log('Begin async operation');
    this.account.startfrom=this.currentItems.length;
    //console.log('Async operation has ended',this.lazyloadobj);
   this.currentItems=[];
    let seq = this.items.getadds(this.account);
        seq.subscribe((res: any) => {
          

          return new Promise((resolve) => {
            setTimeout(() => {
              
              for (var i = 0; i < res.length; i++) {
                this.currentItems.push( res[i] );
              }

              //this.currentItems.push(res)
      
              console.log('Async operation has ended', this.currentItems);
              resolve();
            }, 500);
          })
        })
        return ;
   
  }  

}
