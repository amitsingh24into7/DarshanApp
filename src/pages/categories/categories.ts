import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
//import { Node } from 'ng-material-treetable';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})

export class CategoriesPage {
  
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

}
