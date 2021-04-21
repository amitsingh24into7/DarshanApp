import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartModalserviceProvider } from '../../providers/cart-modalservice/cart-modalservice';
import {  ViewChild, ElementRef } from '@angular/core';
//import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal';
import { BehaviorSubject } from 'rxjs';
import { CartListDetailPage } from '../cart-list-detail/cart-list-detail';
import { User } from '../../providers';




//import {IonTagsInputModule} from "ionic-tags-input";


/**
 * Generated class for the CartListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart-list',
  templateUrl: 'cart-list.html',
})


export class CartListPage {
cart = [];
  products: any = [];
  cartItemCount: BehaviorSubject<number>;
 templeobj:any;
  @ViewChild('cart', {read: ElementRef})fab: ElementRef;
  tagss = ['Ionic', 'Angular', 'TypeScript'];
  tabBarElement: any;
  storeobjofproducts: ArrayBuffer;
  constructor(public user:User,public navCtrl: NavController, public navParams: NavParams,private cartService: CartModalserviceProvider) {
    debugger;
    this.templeobj=this.navParams.get('item')
    this.user.getDef_Currency({templeID:this.templeobj.TempleID}).subscribe(respdata=>{
      this.templeobj.Currency=respdata.temple_def_curr
    })
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  onChange(val){
    console.log(this.tagss);
 console.log('this.templeserviceobj===', this.tagss);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartListPage');
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
     this.cartService.getProducts(this.templeobj).subscribe((data)=>{
      
       this.storeobjofproducts=data
      this.products =data;
     // alert(JSON.stringify(this.products));
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    });
    
  }

  openCartDetail(product){
    
    this.navCtrl.push(CartListDetailPage, {
      product: product,
      currency:this.templeobj.Currency
    });
    
    // this.animateCSS('bounceOutLeft', true);
    // let modal = this.modalCtrl.create(CartListDetailPage,{product: product});
    // modal.onDidDismiss(data => {
    //    console.log("CartListDetailPage MODEL Dismiss:==",data);
    //    this.animateCSS('bounceInLeft');
    //  });
    //  modal.dismiss()
    //  modal.present();

  }
  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  } 

  async openCart() {
    this.navCtrl.push(CartModalPage,{currency:this.templeobj.Currency});
    // this.animateCSS('bounceOutLeft', true);
    // let modal = this.modalCtrl.create(CartModalPage);
    // modal.onDidDismiss(data => {
    //    console.log("SEARCH MODEL Dismiss:==",data);
    //    this.animateCSS('bounceInLeft');
    //  });
    //  modal.present();

    // let modal =  this.modalCtrl.create({
    //   component: CartModalPage,
    //   cssClass: 'cart-modal'
    // });
    // modal.dismiss().then(() => {
    //   this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    //   this.animateCSS('bounceInLeft');
    // });
    // modal.present();
  }
 
  searchFunction(ev){
   
    this.products=this.storeobjofproducts
    debugger;
    var val = ev.target.value;
    if(this.products[0]==null){
      this.products.splice(0, 1);
    }
    // if the value is an empty string don't filter the items
    let islength=this.products.length
    for (let index = 0; index < parseInt(islength); index++) {
      const element = this.products[index];
      
      if(element!=null){
        if (val && val.trim() != '') {
        
          this.products = this.products.filter((item) => {
           
            return (item.product_keywords.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      }
      
    }
    
  }
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

}
