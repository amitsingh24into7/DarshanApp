import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import{User} from '../../providers/user/user'; 
//import { MainPage } from '../';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  tags =[] ;
 
  isChecked:boolean = false;
  account: { clientid:string, appid:string,configtype:string,language:string} = {
    clientid: "",
    appid: "",
    configtype:"LANGUAGE",
    language:'English'
  };
  templeserviceobj: any;
  checked = [];

  //isAvailable;

public naveparamget=false;
  
  constructor(public user: User,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private storage: Storage) {
    this.tags=this.checked;
   this.user.presentLoadingCustom();
    if(this.navParams.get('addtemple')){
      this.naveparamget=true
    }
    
    this.account.appid=this.user.APPID;
    this.account.clientid=this.user.CLIENTID;
    this.user.getSearchConfig(this.account).subscribe((resp) => {
      this.templeserviceobj=resp;
      if(this.navParams.get('from')){
        this.user.gelocaldata(this.user.LANG).then(data=>{
          for(let i =0;i<this.templeserviceobj.length;i++) {
            debugger;
            if(this.templeserviceobj[i].ConfigVal==data){
              this.templeserviceobj[i].isAvailable=true
            }
         }
        })
      }
             
             this.user.loaderdismiss();
             //this.tempobj.push(resp);
             let tempobj:any=resp;
             tempobj.forEach(element => {
              if(element.isAvailable){
                this.checked.push(element.ConfigVal)
              }
             });
            
            this.ionViewDidLoad;
           
          })
  }


 ionViewDidLoad() {
   
    console.log('ionViewDidLoad ModalPage');
  }
  // onChange(val){
   
  //   console.log(this.tags);
  //   console.log('this.templeserviceobj===', this.tempobj);

  // }

  
  dismiss() {
    //let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(this.checked);
  }
  
  selectMember(e:any,checkbox:string){
    //alert();
    debugger;
   console.log('===',this)
console.log(JSON.stringify(e.target.checked));
    if ( e.target.checked) {
      this.checked.push(checkbox);
      //this.tempobj.push(checkbox);
    } else {
      let index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index,1);
      //this.tempobj.splice(index,1);
    }
    console.log("JSON.stringify(this.checked)",JSON.stringify(this.checked));
   }
   

// selectMember(checkbox : String, e: { currentTarget: { checked: any; }; }): void {
//   var isChecked = e.currentTarget.checked;
//   console.log(isChecked);//undefined

// }
   removeCheckedFromArray(checkbox : String) {
    return this.checked.findIndex((category)=>{
      return category === checkbox;
    })
  }
  
  //Empties array with checkedboxes
  emptyCheckedArray() {
    this.checked = [];
  }
  checkAll(){
    //this.checked  :-in this object available all selected data.
    if(this.checked[0]){
      this.storage.set('islogincounter','1');
      this.dismiss();
      let  lang='';
      if(this.checked[0]){
       lang=this.checked[0];
      }else{
        lang='English';
      }

      this.storage.set(this.user.LANG,lang);
      // if(this.naveparamget==false){
      //   this.navCtrl.setRoot(MainPage);
      // }
      
      // this.navCtrl.push('TemplesPage', {
      //   filterservish: this.checked
      // });
      console.log(this.checked);
    }else{
     alert('select  your language preference');
    }
   
  }
  

  //  checkAll(){
  //   //this.checked  :-in this object available all selected data.

  //   this.storage.set('islogincounter','1');
  //   this.dismiss();
  //   let  lang='';
  //   if(this.checked[0]){
  //    lang=this.checked[0];
  //   }else{
  //     lang='English';
  //   }
  //   this.storage.set(this.user.LANG,lang);
  //   if(this.naveparamget==false){
  //     this.navCtrl.setRoot(MainPage);
  //    // this.presentPrompt()   //------------------- Select Temple ID -------
  //   }
    
  //   // this.navCtrl.push('TemplesPage', {
  //   //   filterservish: this.checked
  //   // });
   

  //   console.log(this.checked);
  // }

}
