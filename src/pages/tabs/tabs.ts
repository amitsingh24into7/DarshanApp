import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, AlertController,ModalController } from 'ionic-angular';
import{User} from '../../providers/user/user'; 
import { Tab1Root, /*Tab2Root, Tab3Root,*/Tab4Root,Tab5Root } from '../';
//import { ModalPage} from '../modal/modal';
//import { SearchmodelPage} from '../searchmodel/searchmodel';
//import { footerIsHidden } from '../';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {
 
  searchobj:any=[];
  tab1Root: any = Tab1Root;
  tab2Root: any = "TemplesPage";
  //tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;

  tab1Title = " ";
  tab2Title = "";
  // tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";
 // tab2Root: any;

  constructor(public user: User,public navCtrl: NavController, public translateService: TranslateService,private alertCtrl: AlertController,public modalCtrl: ModalController) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE','TAB3_TITLE','TAB4_TITLE', 'TAB5_TITLE']).subscribe(values => {
      //this.tab1Title = 'Home'+values['TAB1_TITLE'];
      this.tab1Title = 'Explore';
     
      //this.tab2Title = values['TAB2_TITLE'];
      this.tab2Title = "Search";
      // this.tab3Title = 'Product';
      this.tab4Title = 'Mybooking';
      this.tab5Title = 'More';
      debugger;
      // this.tab2Title = values['TAB2_TITLE'];
      // this.tab2Title = values['TAB3_TITLE'];
      // this.tab4Title = values['TAB4_TITLE'];
      // this.tab5Title = values['TAB5_TITLE'];
    });
  }
  

  
  // presentProfileModal() {
  //   // let profileModal = this.modalCtrl.create(ModalPage, { userId: 8675309 });
  //   // profileModal.onDidDismiss(data => {
  //   //   console.log(data);
  //   // });
     
  // }
  

  // opensearch(){  
  //    //this.tab2Root='TemplesPage'
  //   let searchModal = this.modalCtrl.create(SearchmodelPage);
    
  //    searchModal.onDidDismiss(data => {
  //      console.log("SEARCH MODEL Dismiss:==",data);
  //      //this.tab2Root ="TemplesPage"
  //    });
  //    searchModal.present();

  // }
  MycartPage
  openMycart(){
    this.navCtrl.push('MycartPage');
  }


  openproduct(){
    let alert = this.alertCtrl.create({
      title: 'Products',
      // inputs: [
      //   {
      //     name: 'jaapcounter',
      //     placeholder: 'Set counter',
      //     type:'number'
      //   },
        // {
        //   name: 'password',
        //   placeholder: 'Password',
        //   type: 'password'
        // }
          //],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            if (data.jaapcounter) {
             
              // for (let index = 0; index < data.jaapcounter; index++) {
              //   this.playAudio(track,data.jaapcounter);
                
              // }
              
            // this.playAudio(track,data.jaapcounter);
                //this.playAudio(track,data.jaapcounter);
             // console.log(palysts);

              //this.playAudio(track,data.jaapcounter);
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();

  }
}
