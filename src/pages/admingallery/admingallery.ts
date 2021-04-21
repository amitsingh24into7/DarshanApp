import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the AdmingalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admingallery',
  templateUrl: 'admingallery.html',
})
export class AdmingalleryPage {
  templeimagegall:any;
  imagegall:any;
  accountlabelobj:{clientid:string, appid:string,TempleID:string,userid:string}={clientid:'',appid:'',TempleID:'',userid:''}
  imagelocation: any;
  tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public user:User,public alerCtrl: AlertController) {
    this.imagelocation=user.IMAGELOCATION;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.imagegall=this.navParams.get('imagegall');
    debugger;    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmingalleryPage');
  }
  ionViewWillEnter()
  {
    if(this.imagegall){
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.accountlabelobj.userid=data;
        this.accountlabelobj.clientid=this.user.CLIENTID;
        this.accountlabelobj.appid=this.user.APPID;
        this.accountlabelobj.TempleID=this.imagegall['TempleID'];
        this.user.gettempleimages(this.accountlabelobj ).subscribe((data)=>{
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
    
    let imageobj:{clientid:string, appid:string,templeid:string,userid:string,ImageID:string}={clientid:'',appid:'',templeid:'',userid:'',ImageID:''}

    imageobj.templeid=imgingo.TempleID;
    imageobj.appid=this.user.APPID;
    imageobj.clientid=this.user.CLIENTID;
    imageobj.ImageID=imgingo.ImageID;
    imageobj.userid=this.accountlabelobj.userid;
    debugger;
    this.user.deletetempleimages(imageobj).subscribe((data)=>{
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
