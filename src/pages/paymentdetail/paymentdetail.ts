import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';


import * as jsPDF from 'jspdf';

import domtoimage from 'dom-to-image';
import { File, IWriteOptions } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

/**
 * Generated class for the PaymentdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentdetail',
  templateUrl: 'paymentdetail.html',
})
export class PaymentdetailPage {
  accountInfo:{clientid:string,appid:string,roleid:string,userid:string,id:string}={clientid:'',appid:'',roleid:'',userid:'',id:''}
  payPaltransObj: any;
  navparmobj: any;
  tabBarElement: any;
  //mydate=new Date()
  public options: ThemeableBrowserOptions = {
    statusbar: {
      color: '#ffffff',
    },
    toolbar: {
      height: 50,
      color: '#b74103',
    },
    
    closeButton: {
      wwwImage: 'assets/img/close.png',
      align: 'left',
      event: 'closePressed',
    },
  };
  constructor(private themeableBrowser: ThemeableBrowser,public navCtrl: NavController, public navParams: NavParams,public user:User,private file: File,
    private fileOpener: FileOpener) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.user.presentLoadingCustom();
    this.navparmobj= this.navParams.get('detailovj')
    this.user.loaderdismiss();
//     this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
//       this.accountInfo.userid=data;
//       this.accountInfo.appid=user.APPID;
//       this.accountInfo.clientid=user.CLIENTID
//       this.accountInfo.roleid=user.ROLE_ID_TOKEN_KEY;
//       this.accountInfo.id=this.navparmobj.id;
// debugger;
//       this.user.payMentDetailBYpaymentID(this.accountInfo).subscribe((res)=>{
//         this.payPaltransObj=res;
//         this.user.loaderdismiss();
//     })
//     })   
    
    
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentdetailPage');
  }
  

  // exportPdf() {
  //   //this.user.presentLoadingCustom();
  //   const div = document.getElementById("to-pdf");
  //   var doc = new jsPDF('p','pt','a4');
  //   doc.addHTML(div,function() {
  //       //pdf.save('web.pdf');
  //       // let pdfOutput = doc.output();
  //       // let buffer = new ArrayBuffer(pdfOutput.length);
  //       // let array = new Uint8Array(buffer);
  //       // for (var i = 0; i < pdfOutput.length; i++) {
  //       //     array[i] = pdfOutput.charCodeAt(i);
  //       // }
        

  //       //this.user.loaderdismiss();
  //   });
  // }



  exportPdf() {
    //this.presentLoading('Creating PDF file...');
    this.user.presentLoadingCustom();
    debugger;
    const div = document.getElementById("printable-area");
    // const options = { background: "white", height: div.clientWidth, width: div.clientHeight };
    const options = { background: "white", height: div.clientHeight };
    domtoimage.toPng(div, options).then((dataUrl)=> {
      //Initialize JSPDF
     var doc = new jsPDF("p","mm","a4");
    

     //var pdf = new jsPDF('l', 'pt', [$('#divinvoiceprint').width(), $('#divinvoiceprint').height()]);
     //doc.addImage(dataUrl, 'PNG', 40, 10, 140, 120);
     //pdf.addImage(blob, 'PNG', 0, 0, $('#divinvoiceprint').width(), $('#divinvoiceprint').height());

      //Add image Url to PDF
      //doc.addImage(dataUrl, 'PNG', 20, 20, 240, 180);
      doc.addImage(dataUrl, 'PNG', 30, 20, 120, 120);
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

  ionViewWillEnter() {
    if(this.navParams.get('isadmin')==true){
      this.tabBarElement.style.display = 'none';
    }
  }
  ionViewWillLeave()
  {
    if(this.navParams.get('isadmin')==true){
      this.tabBarElement.style.display =null;
      }
    
  }
  open_web_extr_page(t_id,optionID){
    //alert(t_id);
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
      const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.user.IMAGELOCATION+'darshanapp/payment_detail_more.php?t_ID='+t_id+'&User_ID='+data+'&optionID='+optionID, '_blank', this.options);
    
    console.log(JSON.stringify(browser));
    })
    
  }
  
  
}

