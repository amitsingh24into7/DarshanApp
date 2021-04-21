import { Injectable } from '@angular/core';
import{User} from '../../providers/user/user' 
import { Item } from '../../models/item';
import { Api } from '../../providers/api/api';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };
  account: {type:string, roleid: any, clientid:string, appid:string,lang:string} = {
    type:'temple',
    roleid: '',
    clientid: "",
    appid: "",
    lang:''
  };
    authenticationState = new BehaviorSubject(false);

  constructor(public user:User,public api: Api) {
    this.account.appid=user.APPID;
    this.account.roleid=user.ROLE_ID_TOKEN_KEY;
    this.account.clientid=user.CLIENTID;
    this.user.gelocaldata(this.user.LANG).then(res => {this.account.lang=res
      this.getadds(this.account);
    });;
    //this.user.gelocaldata(this.user.LANG).then(res => {this.account.lang=res});;
    
    
   // this.getadds(this.account);
  }
  doref(){
    this.user.gelocaldata(this.user.LANG).then(res => {this.account.clientid=res});;
    this.getadds(this.account);
  }

  getadds(accountInfo: any) {
    let seq = this.api.post('gettemples.php',accountInfo).share();

    seq.subscribe((res: any) => {
      debugger; // If the API returned a successful response, mark the user as logged in
     
       //console.log("909900990099090900909090909",JSON.stringify(res));
       let items =res;
       for (let item of items) {
        this.items.push(new Item(item));
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  gettempleservice(templeID: any) {
    let seq = this.api.post('gettempleservicetest.php',templeID).share();

    seq.subscribe((res: any) => {
      debugger; // If the API returned a successful response, mark the user as logged in
     
       //console.log("909900990099090900909090909",JSON.stringify(res));
       return res;
    }, err => {
      console.error('ERROR', err);
      return true;
    });
    return seq;
  }
  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
