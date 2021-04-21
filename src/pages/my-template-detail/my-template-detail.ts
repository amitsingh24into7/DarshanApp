import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the MyTemplateDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-template-detail',
  templateUrl: 'my-template-detail.html',
})
export class MyTemplateDetailPage {
  tabBarElement: any;
  templateObj: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User,private socialSharing: SocialSharing) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    debugger;
    this.templateObj=navParams.get('item');
   
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
    console.log('ionViewDidLoad MyTemplateDetailPage');
  }
  socialSharingFunction(subject,message){
    //let file, url
    //this.socialSharing.share(message, subject, file, url).then(() => {
    this.socialSharing.share(message, subject, '', '').then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });
  }
}
