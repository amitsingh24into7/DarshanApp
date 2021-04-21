import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../providers';
import { QRScanner,QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the YoutubechainalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-youtubechainal',
  templateUrl: 'youtubechainal.html',
})
export class YoutubechainalPage {
  issubscribe: boolean=false;

  templeid:any;
  temple_id: any;
  TempleNames: any;
  isCheckedTandC: boolean=false;
  address: any;
  termsandC_url:any;
  constructor(public navCtrl: NavController, public qrcodeScanner: QRScanner,public viewCtrl: ViewController, public navParams: NavParams,public user:User) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubechainalPage');
  }
  onChange(e:any){
    //alert();
    this.issubscribe=e.value

}
onChangeTandC(e:any){
  //alert();
  this.isCheckedTandC=e.value

}
updateList(event:any){
  debugger;
  this.user.getTempleIDByshortName({shortname:this.templeid}).subscribe(data=>{
  if(data){
    let tempobj=data;
    this.temple_id=tempobj.TempleID;
    this.TempleNames=tempobj.TempleName;
    this.address=tempobj.address;
    this.termsandC_url=tempobj.terms_conditions_url;
  }else{
    this.temple_id='';
    this.TempleNames='';
    this.address='';
    this.termsandC_url='';
  }
    
  })

}
//


  dismiss() {
   
    let data = {'issubscribe': this.issubscribe,'templeid':this.temple_id};
    this.viewCtrl.dismiss(data);
   
    
  }
  
  closeModel(){
    debugger;
    if(this.templeid){
      if(this.templeid=='waystoworship'){
        if(this.isCheckedTandC==false){
          alert("Please accept Terms & Condition");
          return false;
         }else{
          this.dismiss();
         }
      
      }else{
        if(this.templeid==''){
          alert("Please Enter Temple ID");
          return false;
        }else if(this.templeid!='' && this.temple_id==''){
         alert("Please Enter Valide Temple ID");
         return false;
        }else if(this.isCheckedTandC==false && this.temple_id!=''){
          alert("Please accept Terms & Condition");
          return false;
         }else{
          //  this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
          //   this.user.insert__user_activity_of_t_and_c({TempleID:this.temple_id,userid:data,ischeck:this.isCheckedTandC})
           
          //  })
          this.dismiss();
       
        }
      }
      
    }else{
      alert("Please Enter Temple ID");
    }
    
  }

  qrScanner(){
    // Optionally request the permission early
 this.qrcodeScanner.prepare()
   .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
 
        // start scanning
        var ionApp = document.getElementsByTagName("ion-app")[0];
         // show camera preview
             ionApp.style.display = "none";
             this.qrcodeScanner.show();
            
        let scanSub = this.qrcodeScanner.scan().subscribe((text: string) => {
        // setTimeout(() => {
           ionApp.style.display = "block";
           console.log('Scanned something', text);
           this.templeid=text;
           this.updateList('');
         // alert(text);
          this.qrcodeScanner.hide(); // hide camera preview
 
          scanSub.unsubscribe(); // stop scanning
        // }, 500);
         
          
        });
   
   // wait for user to scan something, then the observable callback will be called
 
      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
   })
   .catch((e: any) => console.log('Error is', e));
   }


}
