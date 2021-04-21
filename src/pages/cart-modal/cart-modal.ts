import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController, ViewController } from 'ionic-angular';


import { Product, CartModalserviceProvider } from './../../providers/cart-modalservice/cart-modalservice';
import {  OnInit } from '@angular/core';


/**
 * Generated class for the CartModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-modal',
  templateUrl: 'cart-modal.html',
})
export class CartModalPage implements OnInit{
  // ngOnInit(): void {
  //   throw new Error("Method not implemented.");
  // }
  cart: Product[] = [];
  tabBarElement: any;
 currency:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartModalserviceProvider, public modalCtrl: ModalController, public alertCtrl: AlertController,public viewCtrl: ViewController
    
    ) {
      debugger;
      this.currency=this.navParams.get('currency');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartModalPage');
  }
  ionViewWillEnter()
  {
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ngOnInit() {
    this.cart = this.cartService.getCart();
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.product_price * j.amount, 0);
  }
 
  

  close() {
    this.viewCtrl.dismiss();
  }
 
  async checkout() {
    // Perfom PayPal or Stripe checkout process
let formobjdetail={"Currency":this.currency,'productobj':this.cart,"Amount":this.getTotal()}
 this.navCtrl.push('DonationPage',{"donationtype":"purchase","formobjOfCheckout":formobjdetail})
    // let alert = await this.alertCtrl.create({
    //  // header: 'Thanks for your Order!',
    //   message: 'We will deliver your food as soon as possible',
    //   buttons: ['OK']
    // });
    // alert.present().then(() => {
    //   //this.modalCtrl.dismiss();
    // });
    //this.viewCtrl.dismiss();
  }


}
