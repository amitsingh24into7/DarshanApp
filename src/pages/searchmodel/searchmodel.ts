import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import{User} from '../../providers/user/user'; 

/**
 * Generated class for the SearchmodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchmodel',
  templateUrl: 'searchmodel.html',
})
export class SearchmodelPage {
  account: { clientid:string, appid:string,configtype:string} = {
    clientid: "",
    appid: "",
    configtype:"POOJA_SERVICE"
  };
  isItemAvailable = false;
  searchobj:any;
  templeserviceobj:any;
  searchtemple: ArrayBuffer;
  constructor(public user: User, public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    //this.user.presentLoadingCustom();
    this.account.appid=this.user.APPID;
    this.account.clientid=this.user.CLIENTID;
    this.user.getSearchConfig(this.account).subscribe((resp) => {
             this.templeserviceobj=resp;
             //this.user.loaderdismiss();

             this.account.configtype="SEARCHTEMPLE"
             this.user.getSearchConfig(this.account).subscribe((resp) => {
               this.searchtemple=resp;
               //this.user.loaderdismiss();
              })

              
            })
           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchmodelPage');
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    
   //debugger;
    // set val to the value of the searchbar
    const val = ev.target.value;
    if(!val){
      this.isItemAvailable = false;
    }
    //this.searchobj=
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.searchobj = this.templeserviceobj.filter((location: { ConfigDisplayVal: { toLowerCase: () => { indexOf: (arg0: any) => number; }; }; }) => {
          if(location.ConfigDisplayVal){
            return location.ConfigDisplayVal.toLowerCase().indexOf(val.toLowerCase()) > -1;
          }
          if(!val){
            this.isItemAvailable = false;
          }
    })
  }else{
    this.isItemAvailable = false;
  }
  
    }
    

  searchMethod(keyname){
    // this.navCtrl.push('TemplesPage', {
    //   filterservish: [keyname]
    // });
    // this.dismiss();{
    //   let data = {filterservish: [keyname]};
    //   this.viewCtrl.dismiss(data)
    // }
    this.viewCtrl.dismiss({filterservish: [keyname]});
    console.log(keyname);
  }

  googlemapPagemodule(compname){
    this.navCtrl.push(compname, {
      pginfoobj: ''
    });
  }


}
