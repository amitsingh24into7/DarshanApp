import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
import * as jsPDF from 'jspdf';

import domtoimage from 'dom-to-image';

import { File, IWriteOptions } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { CartModalserviceProvider } from '../../providers/cart-modalservice/cart-modalservice';
/**
 * Generated class for the PurchaseInvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-purchase-invice',
  templateUrl: 'purchase-invice.html',
})
export class PurchaseInvicePage {
  navparmobj: any;
  cartobj: ArrayBuffer;

  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,private file: File,
    private fileOpener: FileOpener,private cartService: CartModalserviceProvider,) {
    
    this.navparmobj= this.navParams.get('detailovj')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseInvicePage');
    this.getpurchaseinfo()
  }
getpurchaseinfo(){
  this.cartService.getpurchaseInvoice(this.navparmobj).subscribe((data)=>{
    debugger;
      this.cartobj=data;
  })
 // console.log(JSON.stringify(this.navparmobj.txnid));
}


  exportPdf() {
    //this.presentLoading('Creating PDF file...');
    this.user.presentLoadingCustom();
    debugger;
    const div = document.getElementById("printable-area");
    // const options = { background: "white", height: div.clientWidth, width: div.clientHeight };
    const options = { background: "white", height: div.clientWidth };
    domtoimage.toPng(div, options).then((dataUrl)=> {
      //Initialize JSPDF
      var doc = new jsPDF("l","mm","a4");
      //Add image Url to PDF
      doc.addImage(dataUrl, 'PNG', 20, 20, 240, 180);
  
      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
      }  
  
      //This is where the PDF file will stored , you can change it as you like
      // for more information please visit https://ionicframework.com/docs/native/file/
      const directory = this.file.dataDirectory ;
      const fileName = "invoice.pdf";
      let options: IWriteOptions = { replace: true };
  
      this.file.checkFile(directory, fileName).then((success)=> {
        //Writing File to Device
        this.file.writeFile(directory,fileName,buffer, options)
        .then((success)=> {
          this.user.loaderdismiss()
          console.log("File created Succesfully" + JSON.stringify(success));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        })
        .catch((error)=> {
          this.user.loaderdismiss()
          console.log("Cannot Create File " +JSON.stringify(error));
        });
      })
      .catch((error)=> {
        //Writing File to Device
        this.file.writeFile(directory,fileName,buffer)
        .then((success)=> {
          this.user.loaderdismiss()
          console.log("File created Succesfully" + JSON.stringify(success));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        })
        .catch((error)=> {
          this.user.loaderdismiss()
          console.log("Cannot Create File " +JSON.stringify(error));
        });
      });
    })
    .catch(function (error) {
      this.user.loaderdismiss()
      console.error('oops, something went wrong!', error);
    });
  }



}
