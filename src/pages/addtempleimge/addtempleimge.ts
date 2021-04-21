import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {  User } from '../../providers/user/user';
import {Camera,CameraOptions} from '@ionic-native/camera';

//import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
/**
 * Generated class for the AddtempleimgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addtempleimge',
  templateUrl: 'addtempleimge.html',
})
export class AddtempleimgePage {
public labledataobj:any[]=[];
base64Img12:any=''
base64Img13:any[]=[]
updatedata:any;
useforupdateobj:{clientid:string, appid:string,TempleID:string,photo12:any[],photo13:any[],userid:string,ImageID:string,imagetype:string}={clientid:'',appid:'',TempleID:'',photo12:[],photo13:[],userid:'',ImageID:'',imagetype:'12'};
isupdate:boolean;
public accountlabelobj:{photo12:any[],photo13:any[]}={photo12:[],photo13:[]}
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
        this.useforupdateobj.TempleID=this.updatedata[0]['TempleID'];
        this.useforupdateobj.ImageID=this.updatedata[0]['ImageID'];

      })

    }
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtempleimgePage');
    this.isCordova();
  }   
    
  private isCordova(): boolean {
    return this.platform.is('core');
}
  doFormSubmit(){
    this.user.presentLoadingCustom();//----loader start---
    

if(this.isupdate){
  debugger;
  this.useforupdateobj.photo12.push(this.base64Img12);
  this.useforupdateobj.photo13.push(this.base64Img13);
console.log(JSON.stringify(this.useforupdateobj));
this.user.addtempleimagebytempID_imgID(this.useforupdateobj).subscribe((resp)=>{
  // let toast = this.toastCtrl.create({
  //   message: 'Image added',
  //   duration: 3000,
  //   position: 'top'
  // });
  // toast.present();
  this.user.loaderdismiss();//--------loader hide-------
  debugger;
  this.navCtrl.pop(this.navCtrl.getByIndex(this.navCtrl.length()-3));///back one page
  //this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-4));
  //this.navCtrl.push('AddedtemplePage');
})
}else{
  // if(this.navParams.get('addservice')=='addservice'){

  // }
  this.accountlabelobj.photo12.push(this.base64Img12);
  this.accountlabelobj.photo13.push(this.base64Img13);
this.labledataobj.push(this.accountlabelobj);

console.log(JSON.stringify(this.labledataobj));
 
if(this.navParams.get('addservice')=='addservice'){ ///// use for add service

  this.user.inserttempleservice(this.labledataobj).subscribe((data)=>{
    console.log('insert resp',data)
    this.user.removelocaldata('addtempleservice');
    this.user.removelocaldata('s_time_list');
    // let toast = this.toastCtrl.create({
    //   message: "S------",
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.present();
    this.navCtrl.push('AddedtemplePage');
    this.user.loaderdismiss();//--------loader hide-------
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
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-4))
    //this.navCtrl.push('AddedtemplePage');
    this.user.loaderdismiss();//--------loader hide-------
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
    
}


