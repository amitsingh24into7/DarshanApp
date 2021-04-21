import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the AddPaymentUrlListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-payment-url-list',
  templateUrl: 'add-payment-url-list.html',
})
export class AddPaymentUrlListPage {
  tabBarElement: any;
  addpaymentURL: any[];
  accountobj:any;
  localobjpaymenturl:{paymenturlobj:any[]}={paymenturlobj:[]}
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.accountobj=this.navParams.get('formdata');
    
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
      this.user.gelocaldata('addpaymentURLobj_add').then(rest=>{
            debugger;
            if(rest){
              //this.user.removelocaldata('addpaymentURLobj');
              this.user.removelocaldata('addpaymentURLobj_add');
              //this.user.setlocaldata('addpaymentURLobj',rest);
              this.localobjpaymenturl.paymenturlobj.push(rest);
               this.user.gelocaldata('addpaymentURLobj').then(rest_u=>{
                if(rest_u){
                  rest_u.forEach(element => {
                  this.localobjpaymenturl.paymenturlobj.push(element);
                });
                }
                this.user.setlocaldata('addpaymentURLobj',this.localobjpaymenturl.paymenturlobj);
              //   let asd =[];

              //   if(rest_u.length==0){
              //     asd.push(rest_u);
              //     asd.push(rest);
              //     this.localobjpaymenturl.paymenturlobj=asd
              //    // this.localobjpaymenturl.paymenturlobj.push(rest_u);
              //   }
                
              })
            }
            else{
              this.localobjpaymenturl.paymenturlobj=[];
              this.user.gelocaldata('addpaymentURLobj').then(rest_u=>{
                if(rest_u){
                  rest_u.forEach(element => {
                  this.localobjpaymenturl.paymenturlobj.push(element);
                });
                }
              })
            }
          
            
            
          });

      // if(this.addpaymentURL=this.navParams.get('addpaymentURL')){
      //   this.user.gelocaldata('addpaymentURLobj').then(rest=>{
      //     debugger;
      //     if(rest){
      //       this.localobjpaymenturl.paymenturlobj=rest;
      //     }
          
      //     //this.localobjpaymenturl.paymenturlobj.push(this.addpaymentURL);
      //     this.user.setlocaldata('addpaymentURLobj',this.localobjpaymenturl.paymenturlobj);
      //   });
        
      
      // }else{
      //   this.user.gelocaldata('addpaymentURLobj').then(rest=>{
      //     debugger;
      //     this.localobjpaymenturl.paymenturlobj=
          
      //   });
      // }

      
  }
  
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPaymentUrlListPage');
  }
  openmoduleforaddmoretime(modulename){
    //this.navCtrl.push(modulename,{'formdata':this.account});
    this.navCtrl.push(modulename)
  }
  
  doFormSubmitNext(){
    this.openmodule('AddseventtimelistPage');
  }

  openmodule(modulename){   
    debugger;
    this.navCtrl.push(modulename);
  }
  deletefunction(delet_obj){
    
    let index =this.localobjpaymenturl.paymenturlobj.indexOf(delet_obj);
    debugger;
    if(index > -1){
      this.localobjpaymenturl.paymenturlobj.splice(index, 1);
      this.user.setlocaldata('addpaymentURLobj',this.localobjpaymenturl.paymenturlobj);
    }
  }
}
