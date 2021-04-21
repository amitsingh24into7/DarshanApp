import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Contacts } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Items } from '../../providers';
import {CommonPageApi} from '../../providers/common/common_page_api'

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  currentItems: any = [];
  public allContacts: any;
  addobject:any =[];
  addsobj: any = [];
  //filterData: any  =[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public items: Items,
     private socialSharing: SocialSharing,
     private commonPageApi:CommonPageApi,
     public contacts:Contacts) { 
    this.getContacts();
    this.currentItems=this.allContacts;
    this.addobject = navParams.get('addobjindex');
   
  }

  getContacts(): void {
   // debugger;
  // this.allContacts=[{"id":"25","rawId":"36","displayName":"Rajesh","name":{"givenName":"Rajesh","formatted":"Rajesh "},"phoneNumbers":[{"id":"253","pref":false,"value":"9312304169","type":"other"}]},{"id":"91","rawId":"95","name":{},"phoneNumbers":[{"id":"667","pref":false,"value":"+91 90157 72873","type":"mobile"}]},{"id":"11289","rawId":"2","displayName":"Jija Ji","name":{"familyName":"Ji","givenName":"Jija","formatted":"Jija Ji"},"phoneNumbers":[{"id":"15","pref":false,"value":"09006794825","type":"other"}]},{"id":"11291","rawId":"4","displayName":"Niraj","name":{"familyName":"","givenName":"Niraj","formatted":"Niraj "},"phoneNumbers":[{"id":"29","pref":false,"value":"+918409899093","type":"other"}]},{"id":"11292","rawId":"5","displayName":"Prabhshanker","name":{"givenName":"Prabhshanker","formatted":"Prabhshanker "},"phoneNumbers":[{"id":"36","pref":false,"value":"07352611243","type":"other"}]},{"id":"11293","rawId":"6","displayName":"Customer Care","name":{"familyName":"Care","givenName":"Customer","formatted":"Customer Care"},"phoneNumbers":[{"id":"43","pref":false,"value":"121","type":"other"}]},{"id":"11294","rawId":"7","displayName":"My Airtel","name":{"familyName":"Airtel","givenName":"My","formatted":"My Airtel"},"phoneNumbers":[{"id":"50","pref":false,"value":"*121#","type":"other"}]},{"id":"11297","rawId":"10","displayName":"Papa","name":{"givenName":"Papa","formatted":"Papa "},"phoneNumbers":[{"id":"71","pref":false,"value":"9631538560","type":"other"}]},{"id":"11298","rawId":"11","displayName":"Ujjwal","name":{"givenName":"Ujjwal","formatted":"Ujjwal "},"phoneNumbers":[{"id":"78","pref":false,"value":"08002280976","type":"other"}]},{"id":"11299","rawId":"12","displayName":"Jai Prakash","name":{"familyName":"Prakash","givenName":"Jai","formatted":"Jai Prakash"},"phoneNumbers":[{"id":"85","pref":false,"value":"+919010931048","type":"other"}]},{"id":"11302","rawId":"15","displayName":"Joti Bhai","name":{"familyName":"Bhai","givenName":"Joti","formatted":"Joti Bhai"},"phoneNumbers":[{"id":"106","pref":false,"value":"+919430420539","type":"other"}]}];
   //this.currentItems=this.allContacts;
   this.contacts.find(
        ['displayName', 'phoneNumbers'],
        { multiple: true, hasPhoneNumber: true }
    ).then((contacts) => {
      console.log('contect',JSON.stringify(contacts));
      this.allContacts=contacts;
      this.currentItems=contacts;
       
    });
}
  /**
   * Perform a service for the proper items.
   */
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

  /**
   * Navigate to the detail page for this item.
   
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }*/

  radioFocus() {
    debugger;
    console.log('radioFocus');
  }
  radioBlur() {
    debugger;
    console.log('radioBlur');
  }
  /*WhatsApp share method*/
  radioSelect(event: any) {
debugger;
    console.log('radioSelect', event);
    
    // alert(mobilestring + "sp");
    const mobilestring = event.replace(' ', '');
    const num = mobilestring.replace('+91', '');

    this.socialSharing.shareViaWhatsAppToReceiver('+91' + num, this.addobject.AdsTitle, null, this.addobject.AdsURL).then(() => {
     // this.router.navigate(['/tabs/tab3', this.msgwhat]);
      // this.router.navigate(['/tabs/tab3']);
      // Success!
      this.commonPageApi.socialShareInfoInsert(this.addobject,num);
     // this.viewCtrl.dismiss();
      // this.appCtrl.getRootNav().push(SecondPage);
}).catch((err) => {
    //this.router.navigate(['/tabs/tab3', this.msgwhat]);
 });
  }
}
