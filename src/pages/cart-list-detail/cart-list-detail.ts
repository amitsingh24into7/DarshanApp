import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,  ViewController } from 'ionic-angular';
import { CartModalserviceProvider } from '../../providers/cart-modalservice/cart-modalservice';

import { Slides } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal';
//import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the CartListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart-list-detail',
  templateUrl: 'cart-list-detail.html',
})
export class CartListDetailPage {
  @ViewChild(Slides) slides: Slides;
 
  products: any;  
  cartItemCount: BehaviorSubject<number>;
  tabBarElement: any;
  currency: any;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,private cartService: CartModalserviceProvider,  public navParams: NavParams) {
    this.currency=this.navParams.get('currency');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.products=this.navParams.get('product');
    this.cartItemCount = this.cartService.getCartItemCount();
    
  }
  
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }
  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  ionViewWillEnter()
  {
        
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ionViewDidLoad() {
    //alert(this.products.video);

    document.getElementById('videoWrapper').innerHTML = this.products.product_video;
   // alert(JSON.stringify(this.navParams.get('product')));
    console.log(this.navParams.get('product'));
    console.log('ionViewDidLoad CartListDetailPage');
  }
  addToCart(product) {
    this.cartService.addProduct(product);
    //this.close();
  } 
  async openCart() {
    this.navCtrl.push(CartModalPage,{currency:this.currency});
  }
  close(){
    this.viewCtrl.dismiss();
  }

}
