import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StreamingListeDashboardUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-streaming-liste-dashboard-user',
  templateUrl: 'streaming-liste-dashboard-user.html',
})
export class StreamingListeDashboardUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StreamingListeDashboardUserPage');
  }
  openmodalpage(pageName){
    this.navCtrl.push(pageName);
  }
  


  
}
