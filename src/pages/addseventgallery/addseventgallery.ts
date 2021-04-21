import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the AddseventgalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  console.log('ionViewDidLoad AddseventgalleryPage');
@IonicPage()
@Component({
  selector: 'page-addseventgallery',
  templateUrl: 'addseventgallery.html',
})
export class AddseventgalleryPage {

  imagegall:any;
  templeimagegall:any;
  accountlabelobj:{clientid:string, appid:string,roleid:string,eventid:string,userid:string}={clientid:'',appid:'',roleid:'',eventid:'',userid:''}
  imagelocation: any;
  tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,public alerCtrl: AlertController) {
    this.imagelocation=user.IMAGELOCATION;
    this.user.presentLoadingCustom();
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');    
   
    debugger;
    this.imagegall=this.navParams.get('updateeventimagedata')
    
    
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
    console.log('ionViewDidLoad AddseventgalleryPage');
  }
  ionViewWillEnter()
  {
        if(this.imagegall){
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.accountlabelobj.userid=data;
        this.accountlabelobj.clientid=this.user.CLIENTID;
        this.accountlabelobj.appid=this.user.APPID;
        this.accountlabelobj.roleid=this.user.ROLE_ID_TOKEN_KEY
        this.accountlabelobj.eventid=this.imagegall.EventsID;
        this.user.geteventimages(this.accountlabelobj ).subscribe((data)=>{
          this.templeimagegall=data;
          this.user.loaderdismiss();
        });
      })     
      //this.user.loaderdismiss();
    }else{
      this.user.loaderdismiss();
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
    
    let imageobj:{clientid:string, appid:string,templeid:string,userid:string,imageid:string,EventsID:string}={clientid:'',appid:'',templeid:'',userid:'',imageid:'',EventsID:''}

    imageobj.templeid=imgingo.TempleID;
    imageobj.appid=this.user.APPID;
    imageobj.clientid=this.user.CLIENTID;
    imageobj.imageid=imgingo.EventsImageID;
    imageobj.userid=this.accountlabelobj.userid;
    imageobj.EventsID=imgingo.EventsID;
    debugger;
    this.user.deleteEventimage(imageobj).subscribe((data)=>{
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
    debugger;
    // this.navCtrl.push(modulename,{'admingallery':this.templeimagegall
    // });
    
    this.navCtrl.push(modulename,{'admingallery':this.accountlabelobj
  });
    
  }
}