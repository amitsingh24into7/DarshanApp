import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../providers';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {File} from '@ionic-native/file';

import {Camera,CameraOptions} from '@ionic-native/camera';
/**
 * Generated class for the SendNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//declare var window;

@IonicPage()
@Component({
  selector: 'page-send-notification',
  templateUrl: 'send-notification.html',
})
export class SendNotificationPage {
  notificationform: FormGroup;
  tabBarElement: any;
  account:{appid:string,clientid:string,roleid:string,userid:string,templeid:string,subject:string,message:string,accessToken:string,isChecked}={appid:"",clientid:'',roleid:"",userid:"",templeid:'',subject:'',message:'',accessToken:'',isChecked:false}


  navParamsObj: any;
  public form = [
    { val: 'Sausage', isChecked: false }
  ];
  pageUrl: any;
  base64Img12: any;
  base64Img13: any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,private camera:Camera,private platform: Platform, public file:File , public sanitizer:DomSanitizer) {
   
    console.log(this.navParams.get('item'));
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      this.account.appid=user.APPID
      this.account.roleid=user.ROLE_ID_TOKEN_KEY
      this.account.userid=data
      this.account.clientid=user.CLIENTID      
      this.user.gelocaldata(this.user.GOOGLE_ACCESS_TOKEN).then(accessToken=>{
        debugger;
        this.account.accessToken=accessToken;
        if(this.navParams.get('iteID')){       //---------USE Fore Update----------
          let notiID= this.navParams.get('iteID')
          this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.user.IMAGELOCATION+'notificationFile/send_notification.php?from=mobileadsapp&additionalinfo='+JSON.stringify(this.account)+'&myadsid='+notiID);
        }else{          
          this.navParamsObj=this.navParams.get('item');
          this.account.templeid=this.navParamsObj.TempleID
          this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.user.IMAGELOCATION+'notificationFile/send_notification.php?from=mobileadsapp&additionalinfo='+JSON.stringify(this.account));        
        }
      })       

      
     // this.pageUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.user.IMAGELOCATION+'notificationFile/templateForm/index.php?from=mobileadsapp&additionalinfo='+JSON.stringify(this.account));
      })
this.validatorfunction();
    
  }
  ischeckedevent(event){
   // debugger;
    // if(event.checked){
      this.account.isChecked=event.checked
    // }else{

    // }
    
  }
  validatorfunction(){
    this.notificationform = new FormGroup({
      isChecked: new FormControl(this.account.isChecked),
      subject: new FormControl(this.account.subject, [Validators.required, Validators.minLength(2)]),
      
      message: new FormControl(this.account.message, [Validators.required, Validators.minLength(2)]),
    })
  }
        
  get subject(): string {
		return this.notificationform.value['subject'];
  }
  get message(): string {
		return this.notificationform.value['message'];
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
    console.log('ionViewDidLoad SendNotificationPage');
    this.isCordova();
  }
  private isCordova(): boolean {
    return this.platform.is('core');
}
  doFormSubmit(){
    this.user.sendNotification(this.account).subscribe((data)=>{
      console.log(data);
      this.navCtrl.pop();
    })
  }
  imageCapturedGallery(imagetype,event){
    event.target.files;
    debugger;
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.FILE_URI,
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
       
       this.user.uploadOnGoogleDrive(ImageData);
    }),error=>{
      console.log(error);
    })
      
  
        
// var filePhoto = new File(blob);

 //let fileobj= this.getBlob(imagedata)
        // this.user.uploadOnGoogleDrive(fileobj);

  }

  getBlob (b64Data) {
   let  contentType = '';
    let sliceSize = 512;

    b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, {type: contentType});
    return blob;
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
        this.user.uploadOnGoogleDrive(ImageData);
      }
       
       //this.doFormSubmit();
    }),error=>{
      console.log(error);
    })
    
  }
  changeListenerother($event) : void {///----------use for web Image type 13-----------------
   
    var files = $event.target.files;
    var file = files[0];

  if (files && file) {
    debugger;
    //const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable`;
this.user.uploadOnGoogleDrive(file);


      var reader = new FileReader();
      reader.onload =this._handleReaderLoadedother.bind(this);      
      reader.readAsBinaryString(file);
     
  }      
  }
  _handleReaderLoadedother(readerEvt ) {
    var binaryString = readerEvt.target.result;
    this.base64Img13.push("data:image/jpeg;base64,"+btoa(binaryString));
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

}
