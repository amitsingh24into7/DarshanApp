import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {User} from '../user/user'
import { Api } from '..';
/*
  Generated class for the CartModalserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Product {
  product_id: number;
  name: string;
  product_price: number;
  amount: number;
  image:string;
}
@Injectable()
//@Injectable()
export class CartModalserviceProvider {
 
  
  // data: Product[] = [
  //   { id: 0, name: 'fulbatti', price: 0.99, amount: 1, image:'assets/img/fulbatti.jpg' },
  //   { id: 1, name: 'Gulab jal', price: 5.49, amount: 1, image:'assets/img/Gulabjal.jpg' },
  //   { id: 2, name: 'Ganga jal', price: 4.99, amount: 1, image:'assets/img/Gangajal.jpg' },
  //   { id: 3, name: 'Rose', price: 6.99, amount: 1, image:'assets/img/Rose.jpg' },
  //   { id: 4, name: 'Chunri', price: 1.99, amount: 1, image:'assets/img/Chunri.jpg' },
    
  //   { id: 5, name: 'lotus flower', price: 1.99, amount: 1, image:'assets/img/lotusflower.jpg' },
  //   { id: 6, name: '1 Mukhi Rudraksha', price: 500.00, amount: 1, image:'assets/img/1_Mukhi_Rudraksha.jpg' },
  //   { id: 7, name: '2 Mukhi Rudraksha', price: 400.00, amount: 1, image:'assets/img/2_Mukhi_Rudraksha.jpg' },
  //   { id: 8, name: '4 Mukhi Rudraksh', price: 600.99, amount: 1, image:'assets/img/4_Mukhi_Rudraksh.jpg' },
  //   { id: 9, name: '5 Mukhi Rudraksha', price: 120.99, amount: 1, image:'assets/img/5_Mukhi_Rudraksha.jpg' },
  //   { id: 10, name: '7 Mukhi Rudraksha', price: 200.00, amount: 1, image:'assets/img/7_Mukhi_Rudraksha.jpg' },

  //   { id:11, name: '9 Mukhi Rudraksh', price: 600.99, amount: 1, image:'assets/img/9_Mukhi_Rudraksh.jpg' },
  //   { id: 12, name: '14 Mukhi Rudraksha', price: 120.99, amount: 1, image:'assets/img/14_Mukhi_Rudraksha.jpg' },
  //   { id: 13, name: '15 Mukhi Rudraksha', price: 200.00, amount: 1, image:'assets/img/15_Mukhi_Rudraksha.jpg' }
  // ];
 
  public cart = [];
  public cartItemCount = new BehaviorSubject(0);
 accountobj:{ roleid: any, clientid:string, appid:string,userID:string,templeID:string} = {    
  roleid: '',
  clientid: "",
  appid: "",
  templeID:'',
  userID:""
}
  constructor(public http: HttpClient, public user:User,public api: Api) {
    console.log('Hello CartModalserviceProvider Provider');
    user.gelocaldata(user.USER_ID_TOKEN_KEY).then(data=>{
      this.accountobj.userID=data
      this.accountobj.appid=user.APPID
      this.accountobj.clientid=user.CLIENTID
      this.accountobj.roleid=user.ROLE_ID_TOKEN_KEY
    })
  }

  getProducts(templeobj:any) {
    
    // TempleID: "1"
    // TheCount: null
    // compNmae: "TemplePage"
    // title: "Shiva Temple"
   
    this.accountobj.templeID=templeobj.TempleID
    //let seq = this.api.postcartdat('http://localhost/ecom/functions/mobileapi_getallproductcat.php',this.accountobj).share();
    
    let seq = this.api.cart_post('mobileapi_getallproductcat.php',this.accountobj).share();
    
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
     
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  getWishlist(templeobj){

   
    let seq = this.api.cart_post('mobile_My_wishlist.php',templeobj).share();
    
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
     
    }, err => {
      console.error('ERROR', err);
    });
    // let seq=[
    //   {
    //   "wishlist_id":"3",
    //   "customer_id":"2",
    //   "product_id":"16",
    //   "entityID":"105",
    //   "p_cat_id":"10",
    //   "cat_id":"6",
    //   "manufacturer_id":"7",
    //   "date":"2020-04-14 16:31:08",
    //   "product_title":"Puja Thali",
    //   "product_url":"Puja-Thali",
    //   "product_img1":"pujathali.jpg",
    //   "product_img2":"pujathali1.jpg",
    //   "product_img3":"pujathali2.jpg",
    //   "product_price":"500",
    //   "product_psp_price":"550",
    //   "product_desc":"Offer prayers to the deities with Borosil’s beautifully designed Puja Thali made of the finest copper, which will add elegance and charm to your puja<\/span><\/span><\/p>",
      
    //   "product_features":"",
      
    //   "product_video":"\r\n\r\n",
      
    //   "product_keywords":"pujathali,puja-thali,thali",
      
    //   "product_label":"pujathali",
      
    //   "status":"product"
    //   }
    //   ]
    return seq;

  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
  getpurchaseInvoice(tempobj){
    let seq = this.api.cart_post('mobile_getPurchaseInfo.php',tempobj).share();
    
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
     
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.product_id === product.product_id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
      debugger;
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];
        
      // }
    let countval=false

    for (let index of this.cart) {
      if (index.product_id === product.product_id) {
        if(index.amount>1)
        {
          countval=true
          index.amount -= 1;
        if (index.amount == 0) {
          this.cart.splice(index, 1);
        }
        }else{
          countval=false
        }
        
      }
    }
    if(countval){
      this.cartItemCount.next(this.cartItemCount.value - 1);
    }
    
  }
 
  removeProduct(product) {
    
    let indexcount=this.cart.indexOf(product);
    for (let index of this.cart) {
      if (index.product_id === product.product_id) {
        this.cartItemCount.next(this.cartItemCount.value - index.amount);
        this.cart.splice(indexcount, 1);
      }
    }
   }

}
