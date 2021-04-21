import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartModalserviceProvider } from '../../providers/cart-modalservice/cart-modalservice';
import { User } from '../../providers';
import { CartListDetailPage } from '../cart-list-detail/cart-list-detail';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  wishlistobj: ArrayBuffer;
 imgpath:string;
  tabBarElement: any;
  constructor(public navCtrl: NavController,public user:User, public navParams: NavParams,private cartService: CartModalserviceProvider,) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  ionViewWillEnter()
  {
    this.imgpath=this.user.WISHLISTIMAGE;
    this.user.gelocaldata('cartAdmin').then(resp=>{
      //this.wishlistobj =this.cartService.getWishlist(resp)
       this.cartService.getWishlist(resp).subscribe((data)=>{
        this.wishlistobj=data;
        //this.wishlistobj.push({"amount":1})

           //console.log(JSON.stringify(this.wishlistobj));
         });
    })
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ionViewDidLoad() {
    
   
    console.log('ionViewDidLoad WishlistPage');
  }

  openCartDetail(product){
    product.product_img1=this.imgpath+product.product_img1;
    product.product_img2=this.imgpath+product.product_img2;
    product.product_img3=this.imgpath+product.product_img3;
    product.amount=1;
    this.navCtrl.push(CartListDetailPage, {
      product: product
    });
  }
}
