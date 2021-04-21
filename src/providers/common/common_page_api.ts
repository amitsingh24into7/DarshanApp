import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from '../user/user';


@Injectable()
export class CommonPageApi {
 
  authenticationState = new BehaviorSubject(false);
  constructor(public storage:Storage, public api: Api,public user:User) { 
    
  }
  
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  getcommonPage() {
    /*let seq = this.api.post('getmenuforuser.php',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
       
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;*/
    return '<ion-header><ion-navbar><button ion-button menuToggle><ion-icon name="menu"></ion-icon></button><ion-title> Put Your Page Title </ion-title></ion-navbar></ion-header><ion-content padding>Put Your Page Content</ion-content>';
  }
  socialShareInfoInsert(accountInfo: any,number: any){
    debugger;
    let postobj: { [x: string]: any; }['accountInfo']=accountInfo;
        postobj['tonumber']=number;
        this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(res => {
          postobj['userid']=res;
         this.user.gelocaldata(this.user.USERPHONE).then(res => {
          postobj['phone']=res;
          let seq =  this.api.post('useradshitting.php',postobj).share();

            seq.subscribe((res: any) => {
              // If the API returned a successful response, mark the user as logged in
              if (res.status == 'success') {
              
              } else {
              }
            }, err => {
              console.error('ERROR', err);
            });

            return seq;
          });
         });
       
    //this.api.post('insertuser.php',postobj).share();
   
  }
}
