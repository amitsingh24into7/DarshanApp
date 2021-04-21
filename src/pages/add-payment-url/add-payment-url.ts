import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the AddPaymentUrlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-payment-url',
  templateUrl: 'add-payment-url.html',
})
export class AddPaymentUrlPage {

  addtemplelPaymenturl: FormGroup;
  payurlobj:{title:string,url:string,desc:string,amount:string,remarks:string}={title:'',url:'',desc:'',amount:'',remarks:''};

  isupdateobj:{id:string,title:string,url:string,desc:string,amount:string,remarks:string}={title:'',url:'',desc:'',amount:'',remarks:'',id:''};


  
  tabBarElement: any;
  constructor(public navCtrl: NavController,public user:User, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.validatorfunction();
    let updatewithobj;
    if(updatewithobj=this.navParams.get('updateformdata')){
      debugger;
      this.payurlobj.title=updatewithobj.title;
      this.payurlobj.url=updatewithobj.payment_url;
      this.payurlobj.amount=updatewithobj.amount;
      this.payurlobj.desc=updatewithobj.payment_desc;
      this.payurlobj.remarks=updatewithobj.remarks;

      
      // this.isupdateobj.title=updatewithobj.title;
      // this.isupdateobj.url=updatewithobj.url;
      // this.isupdateobj.amount=updatewithobj.amount;
      // this.isupdateobj.desc=updatewithobj.desc;
      // this.isupdateobj.remarks=updatewithobj.remarks;
      this.isupdateobj.id=updatewithobj.id;


    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPaymentUrlPage');
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }
  
  
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  validatorfunction(){
    this.addtemplelPaymenturl = new FormGroup({
        
      title: new FormControl(this.payurlobj.title, [Validators.required, Validators.minLength(2)]),
      url: new FormControl(this.payurlobj.url, [Validators.required, Validators.minLength(2)]),
      desc: new FormControl(this.payurlobj.desc),
      amount: new FormControl(this.payurlobj.amount),
      remarks: new FormControl(this.payurlobj.remarks),
    })
  }
  get title(): string {
		return this.addtemplelPaymenturl.value['title'];
  }
  get url(): string {
		return this.addtemplelPaymenturl.value['url'];
  }
  get desc(): string {
		return this.addtemplelPaymenturl.value['desc'];
  }
  get amount(): string {
		return this.addtemplelPaymenturl.value['amount'];
  }
  get remarks(): string {
		return this.addtemplelPaymenturl.value['remarks'];
  }

  doFormSubmit(){
    //this.user.setlocaldata('addpaymentURL',this.payurlobj);
    if(this.navParams.get('updateformdata')){

    

       this.isupdateobj.title= this.payurlobj.title;
      this.isupdateobj.url= this.payurlobj.url;
      this.isupdateobj.amount=this.payurlobj.amount;
       this.isupdateobj.desc= this.payurlobj.desc;
       this.isupdateobj.remarks=this.payurlobj.remarks;
       
       console.log(JSON.stringify(this.isupdateobj));
       debugger
       this.user.update_pay_url(this.isupdateobj).subscribe((resp_update)=>{
        console.log(JSON.stringify(resp_update));
        this.navCtrl.pop();
       })
       
    }else{
      debugger;
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
      this.user.setlocaldata('addpaymentURLobj_add',this.payurlobj);
      this.navCtrl.push('AddPaymentUrlListPage')
      // this.navCtrl.push('AddPaymentUrlListPage',{'addpaymentURL':this.payurlobj})
    }
    
  }
}
