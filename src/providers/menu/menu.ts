import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable()
export class Menu {
 
  authenticationState = new BehaviorSubject(false);
  constructor(public storage:Storage, public api: Api) { 
    
  }
  
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  getmenu(accountInfo: any) {
    let seq = this.api.post('getmenuforuser.php',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
       
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
}
