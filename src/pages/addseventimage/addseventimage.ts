import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {  User } from '../../providers/user/user';
import {Camera,CameraOptions} from '@ionic-native/camera';

//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
/**
 * Generated class for the AddseventimagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
 
@IonicPage()
@Component({
  selector: 'page-addseventimage',
  templateUrl: 'addseventimage.html',
})
export class AddseventimagePage {

  public labledataobj:any[]=[];
  base64Img12:any=''
base64Img13:any[]=[];
updatedata:any;
useforupdateobj:{clientid:string, appid:string,EventsID:string,photo12:any[],photo13:any[],userid:string,ImageID:string,imagetype:string,isbanner:string}={clientid:'',appid:'',EventsID:'',photo12:[],photo13:[],userid:'',ImageID:'',imagetype:'12',isbanner:''};
isupdate:boolean;
public accountlabelobj:{photo12:any[],photo13:any[],isbanner:string}={photo12:[],photo13:[],isbanner:''}
  tabBarElement: any;
  constructor(public navCtrl: NavController,private platform: Platform, public navParams: NavParams,public user:User,private camera:Camera) {
    
    //private transfer: FileTransfer
    //this.navCtrl.push('AddtempleimgePage',{'formdata':this.labledataobj})
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.labledataobj=(navParams.get('formdata'));
    debugger;
    if(this.updatedata=this.navParams.get('admingallery')){
      this.isupdate=true
      this.useforupdateobj.clientid=this.user.CLIENTID;
      this.useforupdateobj.appid=this.user.APPID;
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(resp=>{
        this.useforupdateobj.userid=resp;
        this.useforupdateobj.EventsID=this.updatedata.eventid;       

      })

    }

  }
  
  ionViewDidLoad() {
    this.isCordova();
    console.log('ionViewDidLoad AddseventimagePage');
  }
  private isCordova(): boolean {
    return this.platform.is('core')
}
  // postonFBPage(){
  //   debugger;
  // this.user.gelocaldata('Logintype').then(datat=>{
  //   if(datat=='Facebook'){
  //     this.fb.api("/me?fields=access_token", []).then((accesstokenresp) => {
  //       accesstokenresp.access_token

  //     });
  //   }
  // })
 // }

     
  
  doFormSubmit(){
    this.user.presentLoadingCustom()

if(this.isupdate){
  this.useforupdateobj.photo12.push(this.base64Img12);
  this.useforupdateobj.photo13.push(this.base64Img13);
console.log(JSON.stringify(this.useforupdateobj));
this.user.addeventimagebytempID_imgID(this.useforupdateobj).subscribe((resp)=>{
  // let toast = this.toastCtrl.create({
  //   message: 'Image added',
  //   duration: 3000,
  //   position: 'top'
  // });
  // toast.present();
  debugger;
  this.user.loaderdismiss();
  //this.navCtrl.pop(this.navCtrl.getByIndex(this.navCtrl.length()-3));/back one page
  //this.navCtrl.push('AddedtemplePage');
  this.navCtrl.pop(this.navCtrl.getByIndex(this.navCtrl.length()-3));
})
}else{
  // if(this.navParams.get('addservice')=='addservice'){

  // }

  this.accountlabelobj.photo12.push(this.base64Img12);
  this.accountlabelobj.photo13.push(this.base64Img13);
this.labledataobj.push(this.accountlabelobj);

console.log(JSON.stringify(this.labledataobj));
 
if(this.navParams.get('addservice')=='addservice'){ ///// use for add service

  this.user.inserttempleevent(this.labledataobj).subscribe((data)=>{
    console.log('insert resp',data)
    this.user.removelocaldata('addtempleevent');
    this.user.removelocaldata('addpaymentURLobj');
    this.user.removelocaldata('e_time_list');
    // let toast = this.toastCtrl.create({
    //   message: "S------",
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
    this.user.loaderdismiss();
    //this.navCtrl.push('AddedtemplePage');
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-5))
  })   
  
}else{

  this.user.submittpopulartemples(this.labledataobj).subscribe((data)=>{//// use for temple
    console.log('insert resp',data)
    this.user.removelocaldata('addtemplefirstlabel');
    this.user.removelocaldata('addtemplesecondtlabel');
    // let toast = this.toastCtrl.create({
    //   message: "S------",
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
    this.user.loaderdismiss();
    
    this.navCtrl.push('AddedtemplePage');
  }) 

}





  // const fileTransfer: FileTransferObject = this.transfer.create();

  // let options: FileUploadOptions = {
  //   fileKey: "photo",
  //   fileName: "test3.jpg",
  //   chunkedMode: false,
  //   mimeType: "image/jpeg",
  //   headers: {}
  // }
  
  // fileTransfer.upload((this.base64Img[1],this.base64Img[0]),'http://eduketor.in/darshanapp/inserttemple.php', options).then(data => {
  //   alert(JSON.stringify(data));
    
  // }, error => {
  //   alert("error");
  //   alert("error" + JSON.stringify(error));
   
  // });
    }
  

   
    
  }

  
  imageCaptured(imagetype){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((ImageData=>{
      if(imagetype=='12'){
        this.base64Img12="data:image/jpeg;base64,"+ImageData;
      }else{
        this.base64Img13.push("data:image/jpeg;base64,"+ImageData);
      }
       //this.doFormSubmit();
    }),error=>{
      console.log(error);
    })
    
  }

  imageCapturedGallery(imagetype){
    debugger;
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    this.camera.getPicture(options).then((ImageData=>{
      if(imagetype=='12'){
        this.base64Img12="data:image/jpeg;base64,"+ImageData;
      }else{
        this.base64Img13.push("data:image/jpeg;base64,"+ImageData);
      }
       //this.doFormSubmit();
    }),error=>{
      console.log(error);
    })
   
  }
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
   // this.user.loaderdismiss();
      this.tabBarElement.style.display =null;
  }
  // nextPage(){
  //   this.imgpov.setImage(this.base64img);
  //   this.nav.push('IdentifyphotoPage');
  // }
  clear(imagetype){

    if(imagetype=='12'){
      this.base64Img12=null;
    }else{
      this.base64Img13=null;
    }
    
  }
  deletefunction(imgingo,imagetype){
    if(imagetype=='12'){
      this.base64Img12=null;
    }else{
      let index = this.base64Img13.indexOf(imgingo);
    
    if(index > -1){
      this.base64Img13.splice(index, 1);
    }
    }
  }

  file: File;
  changeListener($event) : void {///----------use for web Image type 12 -----------------
   
     var files = $event.target.files;
     var file = files[0];
 
   if (files && file) {
       var reader = new FileReader();
       reader.onload =this._handleReaderLoaded.bind(this);      
       reader.readAsBinaryString(file);
      
   }
   }
   _handleReaderLoaded(readerEvt ) {
     var binaryString = readerEvt.target.result;
     this.base64Img12="data:image/jpeg;base64,"+btoa(binaryString);
    }
    changeListenerother($event) : void {///----------use for web Image type 13-----------------
   
     var files = $event.target.files;
     var file = files[0];
 
   if (files && file) {
       var reader = new FileReader();
       reader.onload =this._handleReaderLoadedother.bind(this);      
       reader.readAsBinaryString(file);
      
   }
   }
   _handleReaderLoadedother(readerEvt ) {
     var binaryString = readerEvt.target.result;
     this.base64Img13.push("data:image/jpeg;base64,"+btoa(binaryString));
    }
    
    updateCucumber(ev){
      debugger
      console.log(JSON.stringify(ev.value));
      this.accountlabelobj.isbanner=ev.value;
      this.useforupdateobj.isbanner=ev.value;
    }
}
