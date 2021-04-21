import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
  tabBarElement: any;
  teamObj:any;
  imagelocation:any
  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams,public user:User) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.imagelocation=this.user.IMAGELOCATION
  }
  ionViewWillEnter()
  {
    //this.user.SINGAL_TEMPLE_ID
     this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
      this.user.getTeamByTempleID({templeid:res,clientid:'CLIENTID6',appid:'DARSHANAPP',roleid:'DARSHANUSER'}).subscribe(resobj=>{
        this.teamObj=resobj;
        //console.log(JSON.stringify(resobj));
      })

     })
//{"templeid":196,"clientid":"CLIENTID6","appid":"DARSHANAPP","roleid":"DARSHANUSER"}
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
  }

}