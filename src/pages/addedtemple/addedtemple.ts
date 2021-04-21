import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User } from '../../providers/user/user'

/**
 * Generated class for the AddedtemplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  
@IonicPage()
@Component({
  selector: 'page-addedtemple',
  templateUrl: 'addedtemple.html',
})
export class AddedtemplePage {
  tabBarElement: any;
  
public addedtemplebyuser:any;
public userinfo:{appid:String,clientid:String,userid:number,type:string}={appid:'',clientid:'',userid:null,type:'temple'}
  imagelocation: string;
  isadmin: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public user:User ) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.user.gelocaldata('User_role').then(datares=>{
      debugger;
      if( datares=='superadmin'){
       this.isadmin=true;
      }else{
        this.isadmin=false;
      }

     })
  }
  ionViewWillEnter()
    {
      this.user.presentLoadingCustom();
      
      this.imagelocation=this.user.IMAGELOCATION;
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.userinfo.userid=data;
        this.userinfo.appid=this.user.APPID;
          this.userinfo.clientid=this.user.CLIENTID;
        this.user.getgettemplebyadmin_new(this.userinfo).subscribe((data)=>{
          
          this.addedtemplebyuser=data;
          console.log(JSON.stringify(this.addedtemplebyuser));
          this.user.loaderdismiss();
        })
      })
        this.tabBarElement.style.display = 'none';
    }

    ionViewWillLeave()
    {
      
        this.tabBarElement.style.display =null;
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddedtemplePage');
  }
  openmodule(modulename:any,pginfo: any){
   debugger;
    this.navCtrl.push(modulename,{'item':pginfo});

  }
  deletefunction(data){
    
    let deleteobj:{templeid:string,action:number,appid:string,clientid:string,userid:string}={
      templeid:'',action:0,appid:'',clientid:'',userid:''
    };
    deleteobj.appid=this.user.APPID;
    deleteobj.clientid=this.user.CLIENTID;
    deleteobj.templeid=data.TempleID;
    debugger;
    this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(respdata=>{
      deleteobj.userid=respdata;
      this.user.templedeactive(deleteobj).subscribe((resp)=>{
        debugger;
        if(resp.status=="success"){
          let index = this.addedtemplebyuser.indexOf(data);
    
        if(index > -1){
          this.addedtemplebyuser.splice(index, 1);
        }
        //this.addedtemplebyuser
        
        }
        // let toast = this.toastCtrl.create({
        //   message: resp.status,
        //   duration: 3000,
        //   position: 'top'
        // });
        // toast.present();
      });
    });    
   
  }
  
  
}

