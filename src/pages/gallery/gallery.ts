// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { PhotoViewer } from '@ionic-native/photo-viewer';
// import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
// import { FilePath } from '@ionic-native/file-path';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
//import { FilePath } from '@ionic-native/file-path';
//import { File } from '@ionic-native/file';
import { User } from '../../providers/user/user';

//import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  galleryType = 'regular';
  gallerydataobj:any;
  imagelocation='';
  localfilelocation='';
  public fileTransfer: FileTransferObject = this.transfer.create();
  urlToShow: string;
  constructor(public navCtrl: NavController, public user:User, 
    
    public navParams: NavParams,private photoViewer: PhotoViewer,private transfer: FileTransfer) {
    this.imagelocation=user.IMAGELOCATION;

    
    //this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      let userinfo:{templeid:number}={
        templeid:this.navParams.get('templeid')
      }
      debugger;
      this.user.getgal(userinfo).subscribe((data:any)=>{
        this.gallerydataobj=data;
      })
    // })    
    // debugger;
    
    //   console.log("this.file.resolveNativePathpath--------",this.file.dataDirectory);

   
    // const url = 'https://s3.amazonaws.com/ionic-marketplace/ionic-gallery/screenshot_2.png';

    // this.fileTransfer.download(url, this.file.externalApplicationStorageDirectory+'file.png').then((entry) => {
    //   this.localfilelocation=entry.toURL();
    //   console.log( " DomSanitizer.bypassSecurityTrustUrl(this.urlToShow);",this.DomSanitizer.bypassSecurityTrustUrl(this.urlToShow));
    //   this.file.readAsDataURL(this.file.externalApplicationStorageDirectory,this.localfilelocation).then(imageBase64 => {
    //     this.urlToShow = imageBase64;
    //     //DomSanitizer.bypassSecurityTrustUrl(this.urlToShow);       

    //     });
    //   console.log('download complete: ' + entry.toURL());
    //     console.log('this.file.resolveNativePath',this.file.externalApplicationStorageDirectory)
    // }, (error) => {
    //   // handle error
    //   console.log('this.file.resolveNativePath error',error)
    // });

        // this.file.resolveNativePath('file://assets/www/assets/img/speakers')
    // .then(file => console.log(file))
    // .catch(err => console.log(err));

    // this.fileTransfer=this.transfer.create();
    // this.fileTransfer.download(url, this.file.resolveNativePath('file://assets/www/assets/img/speakers/')+'file.png').then((entry) => {
    //   console.log(' next download complete: ' + entry.toURL());
    //     console.log(' next this.file.resolveNativePath',this.file.resolveNativePath('file://assets/www/assets/img/speakers/'))
    // }, (error) => {
    //   // handle error
    //   console.log(' nextthis.file.resolveNativePath error',error)
    // });
  }  
  getimageURLSanitized() {
    //return this.sanitizer.bypassSecurityTrustUrl(this.urlToShow);

}


  // images=["https://images.unsplash.com/photo-1519396207177-9051cfacb289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80","https://images.unsplash.com/photo-1519396207177-9051cfacb289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80","https://images.unsplash.com/photo-1519396207177-9051cfacb289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80","https://images.unsplash.com/photo-1519396207177-9051cfacb289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80","https://images.unsplash.com/photo-1519396207177-9051cfacb289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80","https://images.unsplash.com/photo-1519396207177-9051cfacb289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"];
  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
    // let imagePath='https://s3.amazonaws.com/ionic-marketplace/ionic-gallery/screenshot_2.png';
    // var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    // var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
  }
// Download a file:


  // viewPhoto(){
  //   this.photoViewer.show('https://www.freakyjolly.com/wp-content/uploads/2017/08/cropped-fjlogo2.png');
  // }
 

  //View only photo with title
  viewPhotoWithTitle(imgurlobj){
   
    this.photoViewer.show(imgurlobj, 'My image title', {share: true});
    
  }
 
  //View photo with sharing option
  // viewPhotoWithShare(){
  //   this.photoViewer.show('https://www.freakyjolly.com/wp-content/uploads/2017/08/cropped-fjlogo2.png,https://www.freakyjolly.com/wp-content/uploads/2017/08/cropped-fjlogo2.png', 'Do you want to Share', {share: true});
  // }
// Create a new name for the image
// lastImage: string = null;
// private createFileName() {
//   var d = new Date(),
//   n = d.getTime(),
//   newFileName =  n + ".jpg";
//   return newFileName;
// }
// private copyFileToLocalDir(namePath, currentName, newFileName) {
//   debugger;
//   this.file.copyFile(namePath, currentName, this.file.externalApplicationStorageDirectory, newFileName).then(success => {
//     this.lastImage = newFileName;
//   }, error => {
//     //this.presentToast('Error while storing file.');
//     console.log('Error while storing file.',error);
//   });  
// }




}
