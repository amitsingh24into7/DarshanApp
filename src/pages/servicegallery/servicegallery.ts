import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController } from 'ionic-angular';
import { User } from '../../providers';
/**
 * Generated class for the ServicegalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicegallery',
  templateUrl: 'servicegallery.html',
})
export class ServicegalleryPage {


  templeimagegall:any;
  accountlabelobj:{clientid:string, appid:string,serviceid:string,userid:string}={clientid:'',appid:'',serviceid:'',userid:''}
  imagelocation: any;
  tabBarElement: any;
  imagegall:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,public alerCtrl: AlertController) {
    this.imagelocation=user.IMAGELOCATION;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    
    // let imagegall;
    // debugger;
    this.imagegall=this.navParams.get('updateserviceimagedata')
    
    
    // else if(imagegall=this.navParams.get('updateserviceimagedata')){
    //   this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
    //     // this.accountlabelobj.userid=data;
    //     // this.accountlabelobj.clientid=this.user.CLIENTID;
    //     // this.accountlabelobj.appid=this.user.APPID;
    //     let tempobj:{serviceid:string}={serviceid:''}
    //     tempobj.serviceid=imagegall.ServiceID;
    //     this.user.getserviceimages(tempobj ).subscribe((data)=>{
    //       this.templeimagegall=data;
    //     });
    //   })
    // }

    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicegalleryPage');
  }
  ionViewWillEnter()
  {
    if(this.imagegall){
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.accountlabelobj.userid=data;
        this.accountlabelobj.clientid=this.user.CLIENTID;
        this.accountlabelobj.appid=this.user.APPID;
        this.accountlabelobj.serviceid=this.imagegall.ServiceID;
        this.user.getserviceimages(this.accountlabelobj ).subscribe((data)=>{
          this.templeimagegall=data;
        });
      })     
       
    }
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }

  confarmationfunction(imgingo){
    let alert = this.alerCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this image?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Ok clicked');
            this.deletefunction(imgingo);
          }
        }
      ]
    });
    alert.present();
  }

  deletefunction(imgingo){
    
    let imageobj:{clientid:string, appid:string,templeid:string,userid:string,imageid:string}={clientid:'',appid:'',templeid:'',userid:'',imageid:''}

    imageobj.templeid=imgingo.TempleID;
    imageobj.appid=this.user.APPID;
    imageobj.clientid=this.user.CLIENTID;
    imageobj.imageid=imgingo.ServiceImageID;
    imageobj.userid=this.accountlabelobj.userid;
    debugger;
    this.user.deleteserviceimage(imageobj).subscribe((data)=>{
      if(data.status!='fail'){
        let index = this.templeimagegall.indexOf(imgingo);
        if(index > -1){
          this.templeimagegall.splice(index, 1);
        }
      }
      // let toast = this.toastCtrl.create({
      //   message: data.status,
      //   duration: 3000,
      //   position: 'top'
      // });
      // toast.present();
      
    }); 
           
  }
  openModule(modulename){
    //this.navCtrl.pop();
    this.navCtrl.push(modulename,{'admingallery':this.templeimagegall
    });
    
  }
}


